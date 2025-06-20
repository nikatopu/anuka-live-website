// src/content/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("admin_token"));
  const navigate = useNavigate();

  useEffect(() => {
    // If the token changes, update localStorage
    if (token) {
      localStorage.setItem("admin_token", token);
    } else {
      localStorage.removeItem("admin_token");
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
    navigate("/admin"); // Redirect to dashboard after login
  };

  const logout = () => {
    setToken(null);
    navigate("/admin/login"); // Redirect to login after logout
  };

  const authHeader = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, authHeader }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
