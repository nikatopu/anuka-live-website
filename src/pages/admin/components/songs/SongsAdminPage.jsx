import { useState, useRef } from "react";
import { useAuth } from "../../../../content/auth/AuthContext";
import { useAppContext } from "../../../../lib/AppContext";
import { uploadToCloudinary } from "../../lib/uploadToCloudinary";
import style from "../blogs/Blogs.module.scss"; // Reusing the same great styles
import {
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

// Matches the filter buttons on the public music page
const SONG_TAGS = ["Album", "Track", "Collab"];

const EMPTY_LINKS = {
  spotify: "",
  appleMusic: "",
  youTube: "",
  soundCloud: "",
  bandCamp: "",
};

const SongsAdminPage = () => {
  const { adminFetch } = useAuth();
  const { songs, loading: isGlobalLoading, refetchAllData } = useAppContext();

  // --- EXPANDED FORM STATE ---
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [imageBigFile, setImageBigFile] = useState(null);
  const [imageSmallFile, setImageSmallFile] = useState(null);

  const [links, setLinks] = useState(EMPTY_LINKS);
  const [tags, setTags] = useState(["Track"]);
  const [featured, setFeatured] = useState(false);
  const [editingSong, setEditingSong] = useState(null); // the song being edited, or null when creating

  // Local UI states
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const formRef = useRef(null);

  // --- Helper to handle changes in the link inputs ---
  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setLinks((prevLinks) => ({ ...prevLinks, [name]: value }));
  };

  const toggleTag = (tag) => {
    setTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setImageBigFile(null);
    setImageSmallFile(null);
    setLinks(EMPTY_LINKS);
    setTags(["Track"]);
    setFeatured(false);
    setEditingSong(null);
    formRef.current?.reset();
  };

  const startEditing = (song) => {
    formRef.current?.reset();
    setEditingSong(song);
    setName(song.name);
    setDescription(song.description || "");
    setImageBigFile(null);
    setImageSmallFile(null);
    setLinks({
      spotify: song.linkSpotify || "",
      appleMusic: song.linkAppleMusic || "",
      youTube: song.linkYouTube || "",
      soundCloud: song.linkSoundCloud || "",
      bandCamp: song.linkBandCamp || "",
    });
    setTags(song.tags ? song.tags.split(",").map((tag) => tag.trim()) : []);
    setFeatured(song.featured);
    setMessage({ type: "", text: "" });
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // --- Form submission logic ---
  const handleSongSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) return;
    if (!editingSong && (!imageBigFile || !imageSmallFile)) {
      setMessage({
        type: "error",
        text: "Please provide both a large and small image.",
      });
      return;
    }

    setIsUploading(true);

    try {
      setMessage({ type: "info", text: "Uploading images..." });
      // Images left empty while editing stay undefined, so the server keeps the current ones
      const [imageBig, imageSmall] = await Promise.all([
        imageBigFile ? uploadToCloudinary(imageBigFile, "songImageBig", adminFetch) : undefined,
        imageSmallFile
          ? uploadToCloudinary(imageSmallFile, "songImageSmall", adminFetch)
          : undefined,
      ]);

      setMessage({ type: "info", text: "Saving song..." });
      const fields = {
        name,
        description,
        imageBig,
        imageSmall,
        linkSpotify: links.spotify,
        linkAppleMusic: links.appleMusic,
        linkYouTube: links.youTube,
        linkSoundCloud: links.soundCloud,
        linkBandCamp: links.bandCamp,
        tags,
        featured,
      };
      if (editingSong) {
        await adminFetch(`/api/admin/songs/${editingSong.id}`, { method: "PUT", json: fields });
      } else {
        await adminFetch("/api/admin/songs", { method: "POST", json: fields });
      }

      setMessage({
        type: "success",
        text: editingSong ? "Song updated successfully!" : "Song uploaded successfully!",
      });
      clearForm();

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
      await adminFetch(`/api/admin/songs/${songId}`, { method: "DELETE" });
      if (editingSong?.id === songId) clearForm();

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
          <form ref={formRef} onSubmit={handleSongSubmit} className={style.uploadForm}>
            <h3>{editingSong ? `Edit "${editingSong.name}"` : "Upload New Song"}</h3>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Song Name"
              maxLength={200}
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Song Description (optional)"
              maxLength={5000}
            />

            <fieldset className={style.linkFieldset}>
              <legend>Type &amp; placement</legend>
              <div className={style.checkboxRow}>
                {SONG_TAGS.map((tag) => (
                  <label key={tag}>
                    <input
                      type="checkbox"
                      checked={tags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                    />
                    {tag}
                  </label>
                ))}
              </div>
              <label className={style.checkboxRow}>
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                Feature on the home page
              </label>
            </fieldset>

            {/* --- NEW FILE INPUTS --- */}
            <div className={style.fileInputGroup}>
              <label>
                <FiImage /> Large Image (Desktop)
                {editingSong && " - leave empty to keep current"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageBigFile(e.target.files[0])}
                required={!editingSong}
              />
            </div>
            <div className={style.fileInputGroup}>
              <label>
                <FiImage /> Small Image (Mobile)
                {editingSong && " - leave empty to keep current"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageSmallFile(e.target.files[0])}
                required={!editingSong}
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
              {isUploading ? "Saving..." : editingSong ? "Save Changes" : "Add Song"}
            </button>
            {editingSong && (
              <button
                type="button"
                onClick={clearForm}
                disabled={isUploading}
                className={style.secondaryButton}
              >
                Cancel Editing
              </button>
            )}

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
                <div
                  key={song.id}
                  className={`${style.blogCard} ${editingSong?.id === song.id ? style.editing : ""}`}
                >
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
                  <div className={style.cardTags}>
                    {song.featured && <span className={style.tag}>★ Featured</span>}
                    {song.tags &&
                      song.tags.split(",").map((tag) => (
                        <span key={tag} className={style.tag}>
                          {tag.trim()}
                        </span>
                      ))}
                  </div>
                  <div className={style.cardActions}>
                    {song.linkYouTube && (
                      <a
                        href={song.linkYouTube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style.iconButton}
                        title="YouTube Link"
                      >
                        <FiVideo />
                      </a>
                    )}
                    <button
                      className={style.iconButton}
                      onClick={() => startEditing(song)}
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
