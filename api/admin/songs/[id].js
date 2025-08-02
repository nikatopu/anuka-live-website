import prisma from "../../../src/lib/prisma.js";
import withAuth from "../../middleware/withAuth.js";
import cloudinary from "../../../src/lib/cloudinary.js";

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
  const { id } = req.query;
  const songId = parseInt(id, 10);

  if (isNaN(songId)) {
    return res.status(400).json({ message: "Invalid song ID." });
  }

  // DELETE: Delete a specific song
  if (req.method === "DELETE") {
    try {
      // 1. Find the song to get its thumbnail URL
      const songToDelete = await prisma.song.findUnique({
        where: { id: songId },
      });

      if (!songToDelete) {
        return res.status(404).json({ message: "Song not found." });
      }

      // 2. Delete the thumbnail from Cloudinary
      const publicId = getPublicIdFromUrl(songToDelete.thumbnailUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
      }

      // 3. Delete the song from the database
      await prisma.song.delete({
        where: { id: songId },
      });

      return res.status(200).json({ message: "Song deleted successfully." });
    } catch (error) {
      console.error("Delete song error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.setHeader("Allow", ["DELETE"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}

export default withAuth(handler);
