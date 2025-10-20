import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";

const AppContext = createContext(null);

export default function AppContextProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [songs, setSongs] = useState([]);
  const [soundDesigns, setSoundDesigns] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdminPage, setIsAdminPage] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null); // The object that is currently playing

  const location = useLocation();

  useEffect(() => {
    setIsAdminPage(location.pathname.startsWith("/admin"));
  }, [location]);

  useEffect(() => {
    console.log("Currently Playing changed:", currentlyPlaying);
  }, [currentlyPlaying]);

  const currentPlaybackRef = useRef(null);
  // Global YouTube player ref and pending video (if any) while player initializes
  const ytPlayerRef = useRef(null);
  const pendingYt = useRef(null);

  const requestPlay = useCallback((controller) => {
    // controller must expose a `pause` function
    if (!controller || typeof controller.pause !== "function") return;
    const current = currentPlaybackRef.current;
    if (current && current !== controller) {
      try {
        current.pause();
      } catch (e) {
        // ignore
      }
    }
    // set the new current controller
    currentPlaybackRef.current = controller;
  }, []);

  // Register the YouTube player instance (from PublicLayout). If a video
  // was requested before the player was ready, play it now.
  const registerYtPlayer = useCallback((player) => {
    ytPlayerRef.current = player;
    if (pendingYt.current) {
      try {
        const { videoId, start = 0 } = pendingYt.current;
        // load and play pending video
        if (player.loadVideoById)
          player.loadVideoById({ videoId, startSeconds: start });
        else if (player.cueVideoById) player.cueVideoById(videoId);
      } catch (e) {
        // ignore
      }
      pendingYt.current = null;
    }
  }, []);

  const playYouTube = useCallback((videoId, meta = {}) => {
    if (!videoId) return;
    const player = ytPlayerRef.current;
    // if player not ready, remember pending video and return
    if (!player) {
      pendingYt.current = { videoId, meta };
      return;
    }
    try {
      if (player.loadVideoById) player.loadVideoById({ videoId });
      else if (player.cueVideoById) player.cueVideoById(videoId);
      if (player.playVideo) player.playVideo();
    } catch (e) {
      console.warn("playYouTube failed", e);
    }
  }, []);

  const pauseYouTube = useCallback(() => {
    const player = ytPlayerRef.current;
    if (!player) return;
    try {
      if (player.pauseVideo) player.pauseVideo();
    } catch (e) {}
  }, []);

  const stopYouTube = useCallback(() => {
    const player = ytPlayerRef.current;
    if (!player) return;
    try {
      if (player.stopVideo) player.stopVideo();
    } catch (e) {}
  }, []);

  const stopCurrent = useCallback(() => {
    const current = currentPlaybackRef.current;

    if (current) {
      try {
        current.pause();
      } catch (e) {}
      currentPlaybackRef.current = null;
    }

    // also stop the YouTube player
    stopYouTube();
  }, []);

  const releaseController = useCallback((controller) => {
    if (currentPlaybackRef.current === controller) {
      currentPlaybackRef.current = null;
    }
  }, []);

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

  const fetchSoundDesigns = useCallback(async () => {
    try {
      const response = await fetch("/api/get/sound-designs");
      if (!response.ok)
        throw new Error("Sound Design data could not be fetched!");
      const data = await response.json();
      setSoundDesigns(data);
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  const refetchAllData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      // Add the new fetch function to Promise.all
      await Promise.all([fetchBlogs(), fetchSongs(), fetchSoundDesigns()]);
    } catch (err) {
      setError("An unexpected error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }, [fetchBlogs, fetchSongs, fetchSoundDesigns]); // Add new dependency

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
        soundDesigns,
        refetchAllData,
        requestPlay,
        stopCurrent,
        releaseController,
        currentlyPlaying,
        setCurrentlyPlaying,
        registerYtPlayer,
        playYouTube,
        pauseYouTube,
        stopYouTube,
        isYtReady: () => Boolean(ytPlayerRef.current),
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
