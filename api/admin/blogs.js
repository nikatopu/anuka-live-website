// api/admin/blogs.js
import prisma from "../../src/lib/prisma.js";
import withAuth from "../middleware/withAuth.js";
import cloudinary from "../../src/lib/cloudinary.js";
import { formidable } from "formidable";

export const config = {
  api: {
    bodyParser: false, // This is ONLY needed for the formidable POST request
  },
};

// Helper function to extract the public_id from a Cloudinary URL
const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const parts = url.split("/");
  const uploadIndex = parts.indexOf("upload");
  if (uploadIndex === -1) return null;
  const publicIdWithFolder = parts.slice(uploadIndex + 2).join("/");
  const publicId = publicIdWithFolder.substring(
    0,
    publicIdWithFolder.lastIndexOf(".")
  );
  return publicId;
};

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const blogs = await prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(blogs);
    } catch (error) {
      console.error("GET error:", error);
      return res.status(500).json({ message: "Error fetching blogs" });
    }
  }

  if (req.method === "POST") {
    const form = formidable({});
    try {
      const [fields, files] = await form.parse(req);
      const { title, description, redirectLink, tags } = fields;
      const { image } = files;

      if (!title || !description || !redirectLink || !tags || !image) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(
        image[0].filepath,
        {
          folder: "my_project_blogs",
          resource_type: "image",
        }
      );

      const newBlog = await prisma.blog.create({
        data: {
          title: title[0],
          description: description[0],
          redirectLink: redirectLink[0],
          tags: tags[0],
          imageUrl: cloudinaryResponse.secure_url,
        },
      });
      return res.status(201).json(newBlog);
    } catch (error) {
      console.error("POST error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  if (req.method === "DELETE") {
    try {
      // --- THE NEW, SIMPLER LOGIC ---
      // Get the ID from the URL query string, NOT the body
      const { id } = req.query;
      const blogId = parseInt(id, 10);

      if (isNaN(blogId)) {
        return res
          .status(400)
          .json({ message: "Invalid or missing blog ID in URL query." });
      }

      const blogToDelete = await prisma.blog.findUnique({
        where: { id: blogId },
      });

      if (!blogToDelete) {
        return res.status(404).json({ message: "Blog post not found." });
      }

      const publicId = getPublicIdFromUrl(blogToDelete.imageUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
      }

      await prisma.blog.delete({ where: { id: blogId } });

      return res.status(200).json({ message: "Blog deleted successfully." });
    } catch (error) {
      console.error("DELETE error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}

export default withAuth(handler);
