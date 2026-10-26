import React, { useEffect } from "react";
import { useAuth } from "../../content/auth/AuthContext";
import { Navigate, Outlet, Link } from "react-router-dom";
import style from "./AdminLayout.module.scss";

const AdminLayout = () => {
  const { status, username, checkSession, logout } = useAuth();

  // Confirm the session cookie is still valid whenever the admin area is opened
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (status === "unknown") {
    return <div className={style.adminLoading}>Checking session...</div>;
  }

  if (status === "anonymous") {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className={style.adminContainer}>
      {/* Admin-specific sidebar or header */}
      <nav className={style.adminNav}>
        <h2>Admin Panel</h2>
        <ul>
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/blogs">Manage Blogs</Link>
          </li>
          <li>
            <Link to="/admin/songs">Manage Songs</Link>
          </li>
          <li>
            <Link to="/admin/sound-design">Manage Sound Design Reels</Link>
          </li>
          <li>
            <Link to="/admin/account">Account &amp; Password</Link>
          </li>
        </ul>
        <span className={style.signedInAs}>Signed in as {username}</span>
        <button onClick={logout} className={style.logoutButton}>
          Logout
        </button>
      </nav>

      <main className={style.adminContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
