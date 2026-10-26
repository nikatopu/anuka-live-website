import { useState } from "react";
import { useAuth } from "../../../../content/auth/AuthContext";
import style from "../blogs/Blogs.module.scss"; // Reusing the same style module
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const MIN_PASSWORD_LENGTH = 12;

const AccountAdminPage = () => {
  const { username, adminFetch } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "The new passwords don't match." });
      return;
    }

    setIsSaving(true);
    setMessage({ type: "info", text: "Changing password..." });
    try {
      await adminFetch("/api/admin/password", {
        method: "POST",
        json: { currentPassword, newPassword },
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage({
        type: "success",
        text: "Password changed. Any other logged-in sessions have been signed out.",
      });
    } catch (error) {
      setMessage({ type: "error", text: `Error: ${error.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={style.pageContainer}>
      <header className={style.pageHeader}>
        <h1>Account</h1>
        <p>Signed in as {username}.</p>
      </header>

      <div className={style.formContainer} style={{ maxWidth: "480px" }}>
        <form onSubmit={handleSubmit} className={style.uploadForm}>
          <h3>Change Password</h3>

          {/* Lets password managers associate the new password with this account */}
          <input type="text" autoComplete="username" value={username || ""} readOnly hidden />
          <input
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
            required
          />
          <input
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={`New password (at least ${MIN_PASSWORD_LENGTH} characters)`}
            minLength={MIN_PASSWORD_LENGTH}
            required
          />
          <input
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat new password"
            minLength={MIN_PASSWORD_LENGTH}
            required
          />

          <button type="submit" disabled={isSaving} className={style.submitButton}>
            {isSaving ? "Saving..." : "Change Password"}
          </button>

          {message.text && (
            <div className={`${style.message} ${style[message.type]}`}>
              {message.type === "success" && <FiCheckCircle />}
              {message.type === "error" && <FiXCircle />}
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AccountAdminPage;
