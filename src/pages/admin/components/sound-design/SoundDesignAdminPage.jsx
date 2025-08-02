import { useState, useEffect } from "react";
import { useAuth } from "../../../../content/auth/AuthContext";
import style from "../blogs/Blogs.module.scss"; // Reusing the same style module
import {
  FiTrash2,
  FiVideo,
  FiImage,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const SoundDesignAdminPage = () => {
  const { authHeader } = useAuth();

  // Local state for this page
  const [soundDesigns, setSoundDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  // UI Feedback state
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Data fetching
  const fetchSoundDesigns = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/sound-designs", {
        headers: {
          ...authHeader(),
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch sound designs. Status: ${response.status}`
        );
      }

      const data = await response.json();
      setSoundDesigns(data);
    } catch (error) {
      setMessage({ type: "error", text: `Error: ${error.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSoundDesigns();
  });

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading || !videoFile || !thumbnailFile) {
      setMessage({
        type: "error",
        text: "Please provide both a video and a thumbnail.",
      });
      return;
    }
    setIsUploading(true);
    setMessage({ type: "info", text: "Uploading reel..." });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", videoFile);
    formData.append("thumbnail", thumbnailFile);

    try {
      const response = await fetch("/api/admin/sound-designs", {
        method: "POST",
        headers: authHeader(),
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Upload failed.");

      setMessage({ type: "success", text: "Reel uploaded successfully!" });
      setTitle("");
      setVideoFile(null);
      setThumbnailFile(null);
      setThumbnailPreview("");
      e.target.reset();
      fetchSoundDesigns();
    } catch (error) {
      setMessage({ type: "error", text: `Error: ${error.message}` });
    } finally {
      setIsUploading(false);
    }
  };

  // Deletion
  const handleDelete = async (reelId) => {
    if (!window.confirm("Delete this sound design reel?")) return;
    setMessage({ type: "info", text: "Deleting reel..." });
    try {
      const response = await fetch(`/api/admin/sound-designs/${reelId}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setMessage({ type: "success", text: "Reel deleted successfully." });
      fetchSoundDesigns();
    } catch (error) {
      setMessage({ type: "error", text: `Failed to delete: ${error.message}` });
    }
  };

  return (
    <div className={style.pageContainer}>
      <header className={style.pageHeader}>
        <h1>Manage Sound Design</h1>
        <p>Upload and manage your sound design video reels.</p>
      </header>

      <div className={style.mainContent}>
        <div className={style.formContainer}>
          <form onSubmit={handleSubmit} className={style.uploadForm}>
            <h3>Upload New Reel</h3>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Reel Title (e.g., 'Action Movie Trailer')"
              required
            />

            <div className={style.fileInputGroup}>
              <label>
                <FiVideo /> Video File:
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                required
              />
            </div>

            <div className={style.fileInputGroup}>
              <label>
                <FiImage /> Custom Thumbnail:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                required
              />
            </div>
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className={style.imagePreview}
                style={{ height: "100px", width: "auto", objectFit: "contain" }}
              />
            )}

            <button
              type="submit"
              disabled={isUploading}
              className={style.submitButton}
            >
              {isUploading ? "Uploading..." : "Upload Reel"}
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

        <div className={style.listContainer}>
          <h3>Existing Reels</h3>
          <div className={style.blogGrid}>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              soundDesigns.map((reel) => (
                <div key={reel.id} className={style.blogCard}>
                  <img
                    src={reel.thumbnailUrl}
                    alt={reel.title}
                    className={style.cardImage}
                  />
                  <div className={style.cardContent}>
                    <h4>{reel.title}</h4>
                  </div>
                  <div className={style.cardActions}>
                    <button
                      className={`${style.iconButton} ${style.deleteButton}`}
                      onClick={() => handleDelete(reel.id)}
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

export default SoundDesignAdminPage;
