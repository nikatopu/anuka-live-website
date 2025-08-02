import prisma from "../../../src/lib/prisma.js";
import withAuth from "../../middleware/withAuth.js";
import cloudinary from "../../../src/lib/cloudinary.js";

// Helper to get public_id from Cloudinary URL (works for video and image)
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
  const { id } = req.query;
  const soundDesignId = parseInt(id, 10);

  if (isNaN(soundDesignId)) {
    return res.status(400).json({ message: "Invalid ID." });
  }

  if (req.method === "DELETE") {
    try {
      // 1. Find the record to get file URLs
      const reelToDelete = await prisma.soundDesign.findUnique({
        where: { id: soundDesignId },
      });

      if (!reelToDelete) {
        return res
          .status(404)
          .json({ message: "Sound design reel not found." });
      }

      // 2. Get public_ids for both video and thumbnail
      const videoPublicId = getPublicIdFromUrl(reelToDelete.videoUrl);
      const thumbnailPublicId = getPublicIdFromUrl(reelToDelete.thumbnailUrl);

      // 3. Delete both files from Cloudinary concurrently
      await Promise.all([
        videoPublicId
          ? cloudinary.uploader.destroy(videoPublicId, {
              resource_type: "video",
            })
          : Promise.resolve(),
        thumbnailPublicId
          ? cloudinary.uploader.destroy(thumbnailPublicId, {
              resource_type: "image",
            })
          : Promise.resolve(),
      ]);

      // 4. Delete the record from the database
      await prisma.soundDesign.delete({
        where: { id: soundDesignId },
      });

      return res
        .status(200)
        .json({ message: "Sound design reel deleted successfully." });
    } catch (error) {
      console.error("Delete sound design error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.setHeader("Allow", ["DELETE"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}

export default withAuth(handler);
