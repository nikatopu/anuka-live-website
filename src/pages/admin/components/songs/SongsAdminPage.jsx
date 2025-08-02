import React, { useState, useRef } from "react";
import { useAuth } from "../../../../content/auth/AuthContext";
import { useAppContext } from "../../../../lib/AppContext";
import style from "../blogs/Blogs.module.scss"; // Reusing the same great styles
import {
  FiUploadCloud,
  FiTrash2,
  FiEdit,
  FiVideo,
  FiCheckCircle,
  FiXCircle,
  FiLink,
  FiImage,
} from "react-icons/fi";

// --- Reusable Skeleton Component for Loading State ---
const SongCardSkeleton = () => (
  <div className={`${style.blogCard} ${style.skeleton}`}>
    <div className={style.skeletonImage}></div>
    <div className={style.skeletonText}></div>
    <div className={style.skeletonActions}></div>
  </div>
);

const SongsAdminPage = () => {
  const { authHeader } = useAuth();
  const { songs, loading: isGlobalLoading, refetchAllData } = useAppContext();

  // --- EXPANDED FORM STATE ---
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [imageBigFile, setImageBigFile] = useState(null);
  const [imageSmallFile, setImageSmallFile] = useState(null);

  const [links, setLinks] = useState({
    spotify: "",
    appleMusic: "",
    youTube: "",
    soundCloud: "",
    bandCamp: "",
  });

  // Local UI states
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Refs for file inputs
  const imageBigRef = useRef(null);
  const imageSmallRef = useRef(null);

  // --- Helper to handle changes in the link inputs ---
  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setLinks((prevLinks) => ({ ...prevLinks, [name]: value }));
  };

  // --- Form submission logic ---
  const handleSongSubmit = async (e) => {
    e.preventDefault();
    if (isUploading || !imageBigFile || !imageSmallFile) {
      setMessage({
        type: "error",
        text: "Please provide both a large and small image.",
      });
      return;
    }

    setIsUploading(true);
    setMessage({ type: "info", text: "Uploading song..." });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("imageBig", imageBigFile);
    formData.append("imageSmall", imageSmallFile);
    formData.append("linkSpotify", links.spotify);
    formData.append("linkAppleMusic", links.appleMusic);
    formData.append("linkYouTube", links.youTube);
    formData.append("linkSoundCloud", links.soundCloud);
    formData.append("linkBandCamp", links.bandCamp);

    try {
      const response = await fetch("/api/admin/songs", {
        method: "POST",
        headers: authHeader(),
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Upload failed.");

      setMessage({ type: "success", text: "Song uploaded successfully!" });
      // Clear form
      setName("");
      setDescription("");
      setImageBigFile(null);
      setImageSmallFile(null);
      setLinks({
        spotify: "",
        appleMusic: "",
        youTube: "",
        soundCloud: "",
        bandCamp: "",
      });
      e.target.reset();

      await refetchAllData();
    } catch (error) {
      setMessage({ type: "error", text: `Error: ${error.message}` });
    } finally {
      setIsUploading(false);
    }
  };

  // --- Delete Handling ---
  const handleDelete = async (songId) => {
    if (!window.confirm("Are you sure you want to delete this song?")) return;
    setMessage({ type: "info", text: "Deleting song..." });

    try {
      const response = await fetch(`/api/admin/songs/${songId}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setMessage({ type: "success", text: "Song deleted successfully." });
      await refetchAllData();
    } catch (error) {
      setMessage({ type: "error", text: `Failed to delete: ${error.message}` });
    }
  };

  return (
    <div className={style.pageContainer}>
      <header className={style.pageHeader}>
        <h1>Manage Songs</h1>
        <p>Add, update, and remove songs from this panel.</p>
      </header>

      <div className={style.mainContent}>
        {/* Left Column: Upload Form */}
        <div className={style.formContainer}>
          <form onSubmit={handleSongSubmit} className={style.uploadForm}>
            <h3>Upload New Song</h3>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Song Name"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Song Description (optional)"
            />

            {/* --- NEW FILE INPUTS --- */}
            <div className={style.fileInputGroup}>
              <label>
                <FiImage /> Large Image (Desktop)
              </label>
              <input
                type="file"
                ref={imageBigRef}
                accept="image/*"
                onChange={(e) => setImageBigFile(e.target.files[0])}
                required
              />
            </div>
            <div className={style.fileInputGroup}>
              <label>
                <FiImage /> Small Image (Mobile)
              </label>
              <input
                type="file"
                ref={imageSmallRef}
                accept="image/*"
                onChange={(e) => setImageSmallFile(e.target.files[0])}
                required
              />
            </div>

            {/* --- NEW LINK INPUTS --- */}
            <fieldset className={style.linkFieldset}>
              <legend>
                <FiLink /> Streaming Links (optional)
              </legend>
              <input
                type="url"
                name="spotify"
                value={links.spotify}
                onChange={handleLinkChange}
                placeholder="Spotify Link"
              />
              <input
                type="url"
                name="appleMusic"
                value={links.appleMusic}
                onChange={handleLinkChange}
                placeholder="Apple Music Link"
              />
              <input
                type="url"
                name="youTube"
                value={links.youTube}
                onChange={handleLinkChange}
                placeholder="YouTube Link"
              />
              <input
                type="url"
                name="soundCloud"
                value={links.soundCloud}
                onChange={handleLinkChange}
                placeholder="SoundCloud Link"
              />
              <input
                type="url"
                name="bandCamp"
                value={links.bandCamp}
                onChange={handleLinkChange}
                placeholder="BandCamp Link"
              />
            </fieldset>

            <button
              type="submit"
              disabled={isUploading}
              className={style.submitButton}
            >
              {isUploading ? "Uploading..." : "Add Song"}
            </button>

            {message.text && (
              <div className={`${style.message} ${style[message.type]}`}>
                {message.type === "success" && <FiCheckCircle />}
                {message.type === "error" && <FiXCircle />}
                {message.text}
              </div>
            )}
          </form>
        </div>

        {/* Right Column: Existing Songs List */}
        <div className={style.listContainer}>
          <h3>Existing Songs</h3>
          <div className={style.blogGrid}>
            {isGlobalLoading ? (
              <>
                <SongCardSkeleton />
                <SongCardSkeleton />
                <SongCardSkeleton />
              </>
            ) : (
              songs.map((song) => (
                <div key={song.id} className={style.blogCard}>
                  {/* We use imageSmall here as it's a smaller card view */}
                  <img
                    src={song.imageSmall}
                    alt={song.name}
                    className={style.cardImage}
                  />
                  <div className={style.cardContent}>
                    <h4>{song.name}</h4>
                    {song.description && (
                      <p>{song.description.substring(0, 80)}...</p>
                    )}
                  </div>
                  <div className={style.cardActions}>
                    <a
                      href={song.linkYouTube || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={style.iconButton}
                      title="YouTube Link"
                    >
                      <FiVideo />
                    </a>
                    <button
                      className={style.iconButton}
                      onClick={() => alert("Edit functionality to be added!")}
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button
                      className={`${style.iconButton} ${style.deleteButton}`}
                      onClick={() => handleDelete(song.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongsAdminPage;
