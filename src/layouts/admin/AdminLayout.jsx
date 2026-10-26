import React, { useEffect } from "react";
import { useAuth } from "../../content/auth/AuthContext";
import { Navigate, Outlet, NavLink } from "react-router-dom";
import {
  FiGrid,
  FiFileText,
  FiMusic,
  FiVideo,
  FiUser,
  FiLogOut,
  FiExternalLink,
} from "react-icons/fi";
import style from "./AdminLayout.module.scss";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: <FiGrid />, end: true },
  { to: "/admin/blogs", label: "Blogs", icon: <FiFileText /> },
  { to: "/admin/songs", label: "Songs", icon: <FiMusic /> },
  { to: "/admin/sound-design", label: "Sound Design", icon: <FiVideo /> },
  { to: "/admin/account", label: "Account", icon: <FiUser /> },
];

const navLinkClass = ({ isActive }) =>
  isActive ? `${style.navLink} ${style.active}` : style.navLink;

const AdminLayout = () => {
  const { status, username, checkSession, logout } = useAuth();

  // Confirm the session cookie is still valid whenever the admin area is opened
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (status === "unknown") {
    return (
      <div className={style.adminLoading}>
        <span className={style.spinner} />
        Checking session...
      </div>
    );
  }

  if (status === "anonymous") {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className={style.adminContainer}>
      <aside className={style.sidebar}>
        <div className={style.brand}>
          <img src="/AnukaIcon.png" alt="" />
          <div>
            <strong>Anuka Live</strong>
            <span>Admin panel</span>
          </div>
        </div>

        {/* Not a <nav> element: the public Header's global `nav` styles would leak in */}
        <div role="navigation" aria-label="Admin sections">
          <ul className={style.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={navLinkClass}>
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className={style.sidebarFooter}>
          <a href="/" target="_blank" rel="noopener noreferrer" className={style.navLink}>
            <FiExternalLink />
            <span>View site</span>
          </a>
          <div className={style.user}>
            <span className={style.avatar}>{username?.[0]?.toUpperCase()}</span>
            <span className={style.username}>{username}</span>
            <button onClick={logout} className={style.logoutButton} title="Log out">
              <FiLogOut />
            </button>
          </div>
        </div>
      </aside>

      <main className={style.adminContent}>
        <div className={style.contentInner}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
