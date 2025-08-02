import React, { useState, useRef } from "react";
import { useAuth } from "../../../../content/auth/AuthContext";
import style from "./Blogs.module.scss";
import { useAppContext } from "../../../../lib/AppContext";
import {
  FiUploadCloud,
  FiTrash2,
  FiEdit,
  FiXCircle,
  FiCheckCircle,
} from "react-icons/fi";

const BlogCardSkeleton = () => (
  <div className={`${style.blogCard} ${style.skeleton}`}>
    <div className={style.skeletonImage}></div>
    <div className={style.skeletonText}></div>
    <div className={style.skeletonActions}></div>
  </div>
);

const BlogsAdminPage = () => {
  const { authHeader } = useAuth();
  const { blogs, loading: isGlobalLoading, refetchAllData } = useAppContext();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [redirectLink, setRedirectLink] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // User feedback state
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" }); // { type: 'success' | 'error', text: '...' }

  const fileInputRef = useRef(null); // To trigger file input click

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearForm = (formElement) => {
    setTitle("");
    setDescription("");
    setRedirectLink("");
    setTags("");
    setImageFile(null);
    setImagePreview("");
    if (formElement) {
      formElement.reset();
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (isUploading || !imageFile) {
      setMessage({ type: "error", text: "Please select an image file." });
      return;
    }

    setIsUploading(true);
    setMessage({ type: "info", text: "Uploading blog..." });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("redirectLink", redirectLink);
    formData.append("tags", tags);
    formData.append("image", imageFile);

    try {
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { ...authHeader() },
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Upload failed.");

      setMessage({ type: "success", text: "Blog uploaded successfully!" });
      clearForm(e.target);

      await refetchAllData();
    } catch (error) {
      setMessage({ type: "error", text: `Error: ${error.message}` });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    setMessage({ type: "info", text: `Deleting blog...` });

    try {
      const response = await fetch(`/api/admin/blogs?id=${blogId}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setMessage({ type: "success", text: "Blog deleted successfully." });

      await refetchAllData();
    } catch (error) {
      setMessage({ type: "error", text: `Failed to delete: ${error.message}` });
    }
  };

  return (
    <div className={style.pageContainer}>
      <header className={style.pageHeader}>
        <h1>Manage Blogs</h1>
        <p>Create, update, and delete blog posts from this panel.</p>
      </header>

      <div className={style.mainContent}>
        <div className={style.formContainer}>
          <form onSubmit={handleBlogSubmit} className={style.uploadForm}>
            <h3>Upload New Blog</h3>

            <div
              className={style.fileDropZone}
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                required
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className={style.imagePreview}
                />
              ) : (
                <div className={style.dropZonePrompt}>
                  <FiUploadCloud size={50} />
                  <span>Click or drag image here</span>
                </div>
              )}
            </div>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog Title"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short Description"
              required
            />
            <input
              type="url"
              value={redirectLink}
              onChange={(e) => setRedirectLink(e.target.value)}
              placeholder="https://full-article-link.com"
              required
            />
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags (comma, separated)"
              required
            />

            <button
              type="submit"
              disabled={isUploading}
              className={style.submitButton}
            >
              {isUploading ? "Uploading..." : "Publish Blog"}
            </button>

            {/* --- Modern Message/Toast Area --- */}
            {message.text && (
              <div className={`${style.message} ${style[message.type]}`}>
                {message.type === "success" && <FiCheckCircle />}
                {message.type === "error" && <FiXCircle />}
                {message.text}
              </div>
            )}
          </form>
        </div>

        {/* Right Column: Existing Blogs List */}
        <div className={style.listContainer}>
          <h3>Existing Blogs</h3>
          <div className={style.blogGrid}>
            {isGlobalLoading ? (
              // --- Skeleton Loading ---
              <>
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
              </>
            ) : (
              // --- Blog Cards ---
              blogs.map((blog) => (
                <div key={blog.id} className={style.blogCard}>
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className={style.cardImage}
                  />
                  <div className={style.cardContent}>
                    <h4>{blog.title}</h4>
                    <p>{blog.description.substring(0, 80)}...</p>
                    <div className={style.cardTags}>
                      {blog.tags.split(",").map((tag) => (
                        <span key={tag} className={style.tag}>
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={style.cardActions}>
                    <button
                      className={style.iconButton}
                      onClick={() => alert("Edit functionality to be added!")}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className={`${style.iconButton} ${style.deleteButton}`}
                      onClick={() => handleDelete(blog.id)}
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

export default BlogsAdminPage;
