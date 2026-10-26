import prisma from "../../../../src/lib/prisma.js";
import withAuth from "../../withAuth.js";
import { destroyAsset } from "../../media.js";
import { readSongFields, withoutEmptyMedia } from "../../fields.js";
import { parseId, readJsonBody, methodNotAllowed, sendError } from "../../request.js";

const IMAGE_FIELDS = ["imageBig", "imageSmall"];

async function handler(req, res) {
  const songId = parseId(req.query.id);
  if (!songId) return res.status(400).json({ message: "Invalid song ID." });

  if (req.method !== "PUT" && req.method !== "DELETE") {
    return methodNotAllowed(req, res, ["PUT", "DELETE"]);
  }

  try {
    const existing = await prisma.song.findUnique({ where: { id: songId } });
    if (!existing) return res.status(404).json({ message: "Song not found." });

    // PUT: Update a song, optionally replacing either image
    if (req.method === "PUT") {
      const fields = readSongFields(readJsonBody(req) || {}, { isUpdate: true });
      const data = withoutEmptyMedia(fields, IMAGE_FIELDS);
      const updated = await prisma.song.update({ where: { id: songId }, data });

      await Promise.all(
        IMAGE_FIELDS.filter((field) => data[field] && data[field] !== existing[field]).map(
          (field) => destroyAsset(existing[field], "image")
        )
      );
      return res.status(200).json(updated);
    }

    // DELETE: Remove the record first, then clean up both images
    await prisma.song.delete({ where: { id: songId } });
    await Promise.all(IMAGE_FIELDS.map((field) => destroyAsset(existing[field], "image")));
    return res.status(200).json({ message: "Song deleted successfully." });
  } catch (error) {
    return sendError(res, error, `Song ${req.method} error`);
  }
}

export default withAuth(handler);
