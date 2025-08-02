import { useAuth } from "../../content/auth/AuthContext";
import { Link, Navigate, Outlet } from "react-router-dom";
import style from "./Admin.module.scss";

const Admin = () => {
  const { token, logout } = useAuth();

  if (!token) {
    // If no token, redirect to the login page
    return <Navigate to="/admin/login" replace />;
  }

  // If token exists, render the nested admin pages
  return (
    <div className={style.admin}>
      <header>
        <Link to={"/admin"}>Admin Panel</Link>
        <button onClick={logout}>Logout</button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
