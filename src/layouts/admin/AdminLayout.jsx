import React from "react";
import { useAuth } from "../../content/auth/AuthContext";
import { Navigate, Outlet, Link } from "react-router-dom";
import style from "./AdminLayout.module.scss";

const AdminLayout = () => {
  const { token, logout } = useAuth();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className={style.adminContainer}>
      {/* Admin-specific sidebar or header */}
      <nav className={style.adminNav}>
        <h2>Admin Panel</h2>
        <ul>
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/blogs">Manage Blogs</Link>
          </li>
          <li>
            <Link to="/admin/songs">Manage Songs</Link>
          </li>
        </ul>
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
