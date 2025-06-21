import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AppContext = createContext(null);

export default function AppContextProvider({ children }) {
  const [blogs, setBlogs] = useState([{}]);
  const [songs, setSongs] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAdminPage, setIsAdminPage] = useState(false);

  const location = useLocation();

  useEffect(
    () => setIsAdminPage(location.pathname.startsWith("/admin")),
    [location]
  );

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Use the public API endpoint
        const response = await fetch("/api/get/blogs");
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchSongs = async () => {
      try {
        setLoading(true);
        // Use the public API endpoint
        const response = await fetch("/api/get/songs");
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const data = await response.json();
        setSongs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
    fetchSongs();
  }, []);

  return (
    <AppContext.Provider
      value={{
        blogs,
        setBlogs,
        songs,
        setSongs,
        loading,
        setLoading,
        error,
        setError,
        isAdminPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  if (!AppContext) {
    throw new Error("useAppContext mus be used within AppContextProvider");
  }

  return useContext(AppContext);
};
