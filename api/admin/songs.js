// // api/admin/songs.js
// import prisma from "../../src/lib/prisma.js";
// import withAuth from "../middleware/withAuth.js";
// import { formidable } from 'formidable';
// import cloudinary from '../../src/lib/cloudinary.js';
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// async function handler(req, res) {
//   // GET request to fetch all songs for the admin panel
//   if (req.method === "GET") {
//     try {
//       const songs = await prisma.song.findMany({
//         orderBy: { createdAt: "desc" },
//       });
//       return res.status(200).json(songs);
//     } catch (error) {
//       return res.status(500).json({ message: "Error fetching songs" });
//     }
//   }

//   // POST request to create a new song
//   if (req.method === "POST") {
//     // Your logic for creating a song will go here.
//     // It will be similar to the blog creation logic.
//     // For now, let's just create one from req.body for simplicity.
//     try {
//       const { name, videoLink, thumbnailUrl } = req.body;
//       const newSong = await prisma.song.create({
//         data: { name, videoLink, thumbnailUrl },
//       });
//       return res.status(201).json(newSong);
//     } catch (error) {
//       console.error("Song creation error:", error);
//       return res.status(500).json({ message: "Internal Server Error" });
//     }
//   }

//   return res.status(405).json({ message: "Method Not Allowed" });
// }

// export default withAuth(handler);
