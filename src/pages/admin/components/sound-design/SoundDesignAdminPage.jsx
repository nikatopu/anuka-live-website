import { useState, useRef } from "react";
import { useAuth } from "../../../../content/auth/AuthContext";
import { useAppContext } from "../../../../lib/AppContext";
import { uploadToCloudinary } from "../../lib/uploadToCloudinary";
import style from "../blogs/Blogs.module.scss"; // Reusing the same style module
import {
  FiTrash2,
  FiEdit,
  FiVideo,
  FiImage,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const SoundDesignAdminPage = () => {
  const { adminFetch } = useAuth();
  const { soundDesigns, loading: isGlobalLoading, refetchAllData } = useAppContext();

  // Form state
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [editingReel, setEditingReel] = useState(null); // the reel being edited, or null when creating

  // UI Feedback state
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const formRef = useRef(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const clearForm = () => {
    setTitle("");
    setVideoFile(null);
    setThumbnailFile(null);
    setThumbnailPreview("");
    setEditingReel(null);
    formRef.current?.reset();
  };

  const startEditing = (reel) => {
    formRef.current?.reset();
    setEditingReel(reel);
    setTitle(reel.title);
    setVideoFile(null);
    setThumbnailFile(null);
    setThumbnailPreview(reel.thumbnailUrl);
    setMessage({ type: "", text: "" });
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) return;
    if (!editingReel && (!videoFile || !thumbnailFile)) {
      setMessage({
        type: "error",
        text: "Please provide both a video and a thumbnail.",
      });
      return;
    }
    setIsUploading(true);

    try {
      // Files left empty while editing stay undefined, so the server keeps the current ones
      let videoUrl, thumbnailUrl;
      if (videoFile) {
        setMessage({ type: "info", text: "Uploading video (this can take a while)..." });
        videoUrl = await uploadToCloudinary(videoFile, "reelVideo", adminFetch);
      }
      if (thumbnailFile) {
        setMessage({ type: "info", text: "Uploading thumbnail..." });
        thumbnailUrl = await uploadToCloudinary(thumbnailFile, "reelThumbnail", adminFetch);
      }

      setMessage({ type: "info", text: "Saving reel..." });
      const fields = { title, videoUrl, thumbnailUrl };
      if (editingReel) {
        await adminFetch(`/api/admin/sound-designs/${editingReel.id}`, {
          method: "PUT",
          json: fields,
        });
      } else {
        await adminFetch("/api/admin/sound-designs", { method: "POST", json: fields });
      }

      setMessage({
        type: "success",
        text: editingReel ? "Reel updated successfully!" : "Reel uploaded successfully!",
      });
      clearForm();
      await refetchAllData();
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
      await adminFetch(`/api/admin/sound-designs/${reelId}`, { method: "DELETE" });
      if (editingReel?.id === reelId) clearForm();

      setMessage({ type: "success", text: "Reel deleted successfully." });
      await refetchAllData();
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
          <form ref={formRef} onSubmit={handleSubmit} className={style.uploadForm}>
            <h3>{editingReel ? `Edit "${editingReel.title}"` : "Upload New Reel"}</h3>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Reel Title (e.g., 'Action Movie Trailer')"
              maxLength={200}
              required
            />

            <div className={style.fileInputGroup}>
              <label>
                <FiVideo /> Video File:
                {editingReel && " (leave empty to keep current)"}
              </label>
              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={(e) => setVideoFile(e.target.files[0])}
                required={!editingReel}
              />
            </div>

            <div className={style.fileInputGroup}>
              <label>
                <FiImage /> Custom Thumbnail:
                {editingReel && " (leave empty to keep current)"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                required={!editingReel}
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
              {isUploading ? "Saving..." : editingReel ? "Save Changes" : "Upload Reel"}
            </button>
            {editingReel && (
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

        <div className={style.listContainer}>
          <h3>Existing Reels</h3>
          <div className={style.blogGrid}>
            {isGlobalLoading ? (
              <p>Loading...</p>
            ) : (
              soundDesigns.map((reel) => (
                <div
                  key={reel.id}
                  className={`${style.blogCard} ${editingReel?.id === reel.id ? style.editing : ""}`}
                >
                  <img
                    src={reel.thumbnailUrl}
                    alt={reel.title}
                    className={style.cardImage}
                  />
                  <div className={style.cardContent}>
                    <h4>{reel.title}</h4>
                  </div>
                  <div className={style.cardActions}>
                    <a
                      href={reel.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={style.iconButton}
                      title="Watch video"
                    >
                      <FiVideo />
                    </a>
                    <button
                      className={style.iconButton}
                      onClick={() => startEditing(reel)}
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button
                      className={`${style.iconButton} ${style.deleteButton}`}
                      onClick={() => handleDelete(reel.id)}
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

export default SoundDesignAdminPage;
