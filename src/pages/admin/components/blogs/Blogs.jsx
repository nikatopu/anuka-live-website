import { useState } from "react";
import { useAuth } from "../../../../content/auth/AuthContext";
import { useAppContext } from "../../../../lib/AppContext";
import style from "./Blogs.module.scss";

const BlogsAdminPage = () => {
  const { authHeader } = useAuth(); // Get the authentication header function
  const { blogs, setBlogs, loading, setLoading } = useAppContext();

  // State for the upload form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [redirectLink, setRedirectLink] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState(null); // To hold the selected file object

  // State for handling feedback to the user
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Function to fetch the list of all blogs from the secure endpoint
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/blogs", {
        headers: authHeader(), // Secure the request
      });
      if (!response.ok) throw new Error("Failed to fetch blogs.");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handler for the form submission
  const handleBlogSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (uploading) return;

    if (!imageFile) {
      setMessage("Please select an image file to upload.");
      return;
    }

    setUploading(true);
    setMessage("Uploading blog...");

    // FormData is essential for sending files (multipart/form-data)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("redirectLink", redirectLink);
    formData.append("tags", tags);
    formData.append("image", imageFile); // 'image' must match the key expected by formidable on the backend

    try {
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: {
          ...authHeader(), // Add the 'Authorization: Bearer <token>' header
          // DO NOT set 'Content-Type': 'multipart/form-data'. The browser will do it automatically with the correct boundary when you use FormData.
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to upload blog.");
      }

      setMessage("Blog uploaded successfully!");

      // Clear the form fields after successful upload
      setTitle("");
      setDescription("");
      setRedirectLink("");
      setTags("");
      setImageFile(null);
      e.target.reset(); // Resets the file input

      // Refresh the list of blogs to show the new one
      fetchBlogs();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (loading) return;
    setLoading(true);
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }
    setMessage(`Deleting blog #${blogId}...`);

    try {
      const response = await fetch(`/api/admin/blogs?id=${blogId}`, {
        method: "DELETE",
        headers: {
          ...authHeader(),
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to delete the blog.");
      }

      setMessage("Blog deleted successfully.");
      fetchBlogs();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <h2>Manage Blogs</h2>

      {/* UPLOAD FORM */}
      <div className={style.uploadForm}>
        <h3>Upload New Blog</h3>
        <form onSubmit={handleBlogSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Ex: Anuka Kipshidze - The best of the best"}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                "Ex: The best of the best, Anuka Kipshidze wins another award..."
              }
              required
            />
          </div>
          <div>
            <label htmlFor="redirectLink">Redirect Link:</label>
            <input
              type="text"
              id="redirectLink"
              value={redirectLink}
              onChange={(e) => setRedirectLink(e.target.value)}
              placeholder={"Ex: hhtps://www.billboard.com/anuka-is-awesome/"}
              required
            />
          </div>
          <div>
            <label htmlFor="tags">Tags (comma-separated):</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder={"Ex: Billboard, TSA"}
              required
            />
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Blog"}
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>

      <hr style={{ margin: "2rem 0" }} />

      {/* BLOGS LIST */}
      <div className="blogs-list">
        <h3>Existing Blogs</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <img src={blog.imageUrl} alt={blog.title} width="100" />
                  </td>
                  <td>{blog.title}</td>
                  <td>
                    {/* Add Edit/Delete buttons here */}
                    <button
                      onClick={() => alert("Edit functionality to be added!")}
                    >
                      Edit
                    </button>
                    {/* The delete button is functional if you create the DELETE API endpoint */}
                    <button
                      onClick={() => handleDelete(blog.id)}
                      style={{ marginLeft: "8px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BlogsAdminPage;
