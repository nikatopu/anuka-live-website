import React, { useState, useRef } from "react";
import { useAuth } from "../../../../content/auth/AuthContext";
import style from "./Blogs.module.scss";
import { useAppContext } from "../../../../lib/AppContext";
import { uploadToCloudinary } from "../../lib/uploadToCloudinary";
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
  const { adminFetch } = useAuth();
  const { blogs, loading: isGlobalLoading, refetchAllData } = useAppContext();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [redirectLink, setRedirectLink] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [editingBlog, setEditingBlog] = useState(null); // the blog being edited, or null when creating

  // User feedback state
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" }); // { type: 'success' | 'error', text: '...' }

  const formRef = useRef(null);
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

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setRedirectLink("");
    setTags("");
    setImageFile(null);
    setImagePreview("");
    setEditingBlog(null);
    formRef.current?.reset();
  };

  const startEditing = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setDescription(blog.description);
    setRedirectLink(blog.redirectLink);
    setTags(blog.tags);
    setImageFile(null);
    setImagePreview(blog.imageUrl);
    setMessage({ type: "", text: "" });
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) return;
    if (!editingBlog && !imageFile) {
      setMessage({ type: "error", text: "Please select an image file." });
      return;
    }

    setIsUploading(true);

    try {
      let imageUrl;
      if (imageFile) {
        setMessage({ type: "info", text: "Uploading image..." });
        imageUrl = await uploadToCloudinary(imageFile, "blogImage", adminFetch);
      }

      setMessage({ type: "info", text: "Saving blog..." });
      const fields = { title, description, redirectLink, tags, imageUrl };
      if (editingBlog) {
        await adminFetch(`/api/admin/blogs/${editingBlog.id}`, { method: "PUT", json: fields });
      } else {
        await adminFetch("/api/admin/blogs", { method: "POST", json: fields });
      }

      setMessage({
        type: "success",
        text: editingBlog ? "Blog updated successfully!" : "Blog uploaded successfully!",
      });
      clearForm();

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
      await adminFetch(`/api/admin/blogs/${blogId}`, { method: "DELETE" });
      if (editingBlog?.id === blogId) clearForm();

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
          <form ref={formRef} onSubmit={handleBlogSubmit} className={style.uploadForm}>
            <h3>{editingBlog ? `Edit "${editingBlog.title}"` : "Upload New Blog"}</h3>

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
                  <span>Click to choose an image</span>
                </div>
              )}
            </div>
            {editingBlog && (
              <span className={style.hint}>Click the image to replace it.</span>
            )}

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog Title"
              maxLength={200}
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short Description"
              maxLength={5000}
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
              maxLength={200}
              required
            />

            <button
              type="submit"
              disabled={isUploading}
              className={style.submitButton}
            >
              {isUploading ? "Saving..." : editingBlog ? "Save Changes" : "Publish Blog"}
            </button>
            {editingBlog && (
              <button
                type="button"
                onClick={clearForm}
                disabled={isUploading}
                className={style.secondaryButton}
              >
                Cancel Editing
              </button>
            )}

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
                <div
                  key={blog.id}
                  className={`${style.blogCard} ${editingBlog?.id === blog.id ? style.editing : ""}`}
                >
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className={style.cardImage}
                  />
                  <div className={style.cardContent}>
                    <h4>{blog.title}</h4>
                    <p>{blog.description.substring(0, 80)}...</p>
                  </div>
                  <div className={style.cardTags}>
                    {blog.tags.split(",").map((tag) => (
                      <span key={tag} className={style.tag}>
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  <div className={style.cardActions}>
                    <button
                      className={style.iconButton}
                      onClick={() => startEditing(blog)}
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button
                      className={`${style.iconButton} ${style.deleteButton}`}
                      onClick={() => handleDelete(blog.id)}
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

export default BlogsAdminPage;
