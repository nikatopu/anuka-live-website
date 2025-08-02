// api/admin/songs.js
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
  // GET: Fetch all songs (This remains the same)
  if (req.method === "GET") {
    // ... (Your existing GET logic is fine)
  }

  // POST: Create a new song with all the new fields
  if (req.method === "POST") {
    const form = formidable({ multiples: true }); // Allow multiple files
    try {
      const [fields, files] = await form.parse(req);

      // Destructure all the new fields from the form
      const {
        name,
        description,
        linkSpotify,
        linkAppleMusic,
        linkYouTube,
        linkSoundCloud,
        linkBandCamp,
      } = fields;

      // We now expect two image files
      const { imageBig, imageSmall } = files;

      if (!name || !imageBig || !imageSmall) {
        return res
          .status(400)
          .json({ message: "Name and both image sizes are required." });
      }

      // --- Upload both images to Cloudinary concurrently ---
      const [imageBigResponse, imageSmallResponse] = await Promise.all([
        cloudinary.uploader.upload(imageBig[0].filepath, {
          folder: "my_project_songs/big",
        }),
        cloudinary.uploader.upload(imageSmall[0].filepath, {
          folder: "my_project_songs/small",
        }),
      ]);

      // Create the new song record in the database
      const newSong = await prisma.song.create({
        data: {
          name: name[0],
          description: description ? description[0] : null,
          imageBig: imageBigResponse.secure_url,
          imageSmall: imageSmallResponse.secure_url,
          linkSpotify: linkSpotify ? linkSpotify[0] : null,
          linkAppleMusic: linkAppleMusic ? linkAppleMusic[0] : null,
          linkYouTube: linkYouTube ? linkYouTube[0] : null,
          linkSoundCloud: linkSoundCloud ? linkSoundCloud[0] : null,
          linkBandCamp: linkBandCamp ? linkBandCamp[0] : null,
        },
      });

      return res.status(201).json(newSong);
    } catch (error) {
      console.error("Song creation error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}

export default withAuth(handler);
