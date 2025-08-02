import prisma from "../src/lib/prisma.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const soundDesigns = await prisma.soundDesign.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(soundDesigns);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error fetching sound designs" });
  }
}
