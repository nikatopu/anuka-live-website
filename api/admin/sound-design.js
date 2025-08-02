import prisma from "../../src/lib/prisma.js";
import withAuth from "../middleware/withAuth.js";
import cloudinary from "../../src/lib/cloudinary.js";
import { formidable } from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  // GET: Fetch all sound design reels
  if (req.method === "GET") {
    try {
      const soundDesigns = await prisma.soundDesign.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(soundDesigns);
    } catch (error) {
      console.error("Error fetching sound designs:", error);
      return res.status(500).json({ message: "Error fetching sound designs" });
    }
  }

  // POST: Create a new sound design reel
  if (req.method === "POST") {
    const form = formidable({});
    try {
      const [fields, files] = await form.parse(req);

      const { title } = fields;
      const { video, thumbnail } = files;

      if (!title || !video || !thumbnail) {
        return res
          .status(400)
          .json({ message: "Title, video, and thumbnail are required." });
      }

      // --- Upload video and thumbnail to Cloudinary concurrently ---
      // IMPORTANT: For videos, you must specify `resource_type: "video"`
      const [videoResponse, thumbnailResponse] = await Promise.all([
        cloudinary.uploader.upload(video[0].filepath, {
          folder: "my_project_sound_designs/videos",
          resource_type: "video",
        }),
        cloudinary.uploader.upload(thumbnail[0].filepath, {
          folder: "my_project_sound_designs/thumbnails",
          resource_type: "image",
        }),
      ]);

      // Create the record in the database
      const newSoundDesign = await prisma.soundDesign.create({
        data: {
          title: title[0],
          videoUrl: videoResponse.secure_url,
          thumbnailUrl: thumbnailResponse.secure_url,
        },
      });

      return res.status(201).json(newSoundDesign);
    } catch (error) {
      console.error("Sound Design creation error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}

export default withAuth(handler);
