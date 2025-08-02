import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";

const AppContext = createContext(null);

export default function AppContextProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdminPage, setIsAdminPage] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsAdminPage(location.pathname.startsWith("/admin"));
  }, [location]);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await fetch("/api/get/blogs");

      if (!response.ok) throw new Error("Blog data could not be fetched!");

      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  const fetchSongs = useCallback(async () => {
    try {
      const response = await fetch("/api/get/songs");

      if (!response.ok) throw new Error("Song data could not be fetched!");

      const data = await response.json();
      setSongs(data);
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  const refetchAllData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      await Promise.all([fetchBlogs(), fetchSongs()]);
    } catch (err) {
      setError("An unexpected error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }, [fetchBlogs, fetchSongs]);

  useEffect(() => {
    refetchAllData();
  }, [refetchAllData]);

  return (
    <AppContext.Provider
      value={{
        blogs,
        songs,
        loading,
        error,
        isAdminPage,
        // Expose the refetch function so other components can trigger an update
        refetchAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined || context === null) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
