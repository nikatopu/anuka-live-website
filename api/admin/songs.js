import prisma from "../../src/lib/prisma.js";
import withAuth from "../_lib/withAuth.js";
import { readSongFields } from "../_lib/fields.js";
import { readJsonBody, methodNotAllowed, sendError } from "../_lib/request.js";

// POST: Create a song. Both images are uploaded to Cloudinary by the browser first.
async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(req, res, ["POST"]);

  try {
    const data = readSongFields(readJsonBody(req) || {});
    const newSong = await prisma.song.create({ data });
    return res.status(201).json(newSong);
  } catch (error) {
    return sendError(res, error, "Song creation error");
  }
}

export default withAuth(handler);
