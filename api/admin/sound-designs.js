import prisma from "../../src/lib/prisma.js";
import withAuth from "../_lib/withAuth.js";
import { readSoundDesignFields } from "../_lib/fields.js";
import { readJsonBody, methodNotAllowed, sendError } from "../_lib/request.js";

// POST: Create a sound design reel. The video and thumbnail are uploaded
// to Cloudinary by the browser first.
async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(req, res, ["POST"]);

  try {
    const data = readSoundDesignFields(readJsonBody(req) || {});
    const newSoundDesign = await prisma.soundDesign.create({ data });
    return res.status(201).json(newSoundDesign);
  } catch (error) {
    return sendError(res, error, "Sound Design creation error");
  }
}

export default withAuth(handler);
