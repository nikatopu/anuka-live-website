// api/songs.js
import prisma from "../../src/lib/prisma.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const songs = await prisma.song.findMany({
      // Order by most recent first
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(songs);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error fetching songs" });
  }
}
