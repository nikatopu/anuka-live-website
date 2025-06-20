// api/blogs.js
import prisma from "../../src/lib/prisma.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const data = await prisma.blog.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error fetching blogs" });
  }
}
