// src/pages/admin/Login.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { FiAlertCircle, FiArrowLeft } from "react-icons/fi";
import { useAuth } from "../../../../content/auth/AuthContext";
import style from "./Login.module.scss";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { status, checkSession, login } = useAuth();

  // Skip the form if there's already a valid session
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (status === "authenticated") {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // On successful login, the AuthContext handles navigation
      await login(username, password);
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={style.loginPage}>
      <div className={style.card}>
        <img src="/AnukaIcon.png" alt="" className={style.logo} />
        <h1>Admin login</h1>
        <p className={style.subtitle}>Sign in to manage the Anuka Live website.</p>

        <form onSubmit={handleSubmit} className={style.form}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className={style.error} role="alert">
              <FiAlertCircle /> {error}
            </p>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>

      <a href="/" className={style.backLink}>
        <FiArrowLeft /> Back to the website
      </a>
    </div>
  );
};

export default LoginPage;
