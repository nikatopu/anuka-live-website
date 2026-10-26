// src/content/AuthContext.jsx
// The session lives in an HttpOnly cookie set by /api/admin/login, so page
// scripts never see the token. We only track whether we're logged in.
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const readJson = (response) => response.json().catch(() => ({}));

export const AuthProvider = ({ children }) => {
  // "unknown" until the session has been checked
  const [status, setStatus] = useState("unknown");
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  // Remove tokens left behind by the old localStorage-based login
  useEffect(() => {
    try {
      localStorage.removeItem("admin_token");
    } catch (e) {}
  }, []);

  const setLoggedOut = useCallback(() => {
    setUsername(null);
    setStatus("anonymous");
  }, []);

  const checkSession = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/session", { cache: "no-store" });
      if (!response.ok) return setLoggedOut();
      const data = await readJson(response);
      setUsername(data.username);
      setStatus("authenticated");
    } catch (e) {
      setLoggedOut();
    }
  }, [setLoggedOut]);

  const login = async (user, password) => {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password }),
    });
    const data = await readJson(response);
    if (!response.ok) throw new Error(data.message || "Failed to login");

    setUsername(data.username);
    setStatus("authenticated");
    navigate("/admin"); // Redirect to dashboard after login
  };

  const logout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (e) {}
    setLoggedOut();
    navigate("/admin/login"); // Redirect to login after logout
  };

  // fetch() for admin API calls: sends `json` as the body, throws with the
  // server's message on failure, and returns to login when the session expires
  const adminFetch = useCallback(
    async (url, { json, ...options } = {}) => {
      const response = await fetch(url, {
        ...options,
        ...(json !== undefined && {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(json),
        }),
      });
      const data = await readJson(response);

      if (response.status === 401) {
        setLoggedOut();
        navigate("/admin/login");
      }
      if (!response.ok) throw new Error(data.message || `Request failed (${response.status})`);
      return data;
    },
    [navigate, setLoggedOut]
  );

  return (
    <AuthContext.Provider
      value={{ status, username, checkSession, login, logout, adminFetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
