import prisma from "../../../src/lib/prisma.js";
import withAuth from "../../_lib/withAuth.js";
import { destroyAsset } from "../../_lib/media.js";
import { readSoundDesignFields, withoutEmptyMedia } from "../../_lib/fields.js";
import { parseId, readJsonBody, methodNotAllowed, sendError } from "../../_lib/request.js";

const MEDIA = [
  { field: "videoUrl", resourceType: "video" },
  { field: "thumbnailUrl", resourceType: "image" },
];

async function handler(req, res) {
  const soundDesignId = parseId(req.query.id);
  if (!soundDesignId) return res.status(400).json({ message: "Invalid ID." });

  if (req.method !== "PUT" && req.method !== "DELETE") {
    return methodNotAllowed(req, res, ["PUT", "DELETE"]);
  }

  try {
    const existing = await prisma.soundDesign.findUnique({ where: { id: soundDesignId } });
    if (!existing) return res.status(404).json({ message: "Sound design reel not found." });

    // PUT: Update a reel, optionally replacing the video and/or thumbnail
    if (req.method === "PUT") {
      const fields = readSoundDesignFields(readJsonBody(req) || {}, { isUpdate: true });
      const data = withoutEmptyMedia(fields, MEDIA.map((m) => m.field));
      const updated = await prisma.soundDesign.update({ where: { id: soundDesignId }, data });

      await Promise.all(
        MEDIA.filter(({ field }) => data[field] && data[field] !== existing[field]).map(
          ({ field, resourceType }) => destroyAsset(existing[field], resourceType)
        )
      );
      return res.status(200).json(updated);
    }

    // DELETE: Remove the record first, then clean up its files
    await prisma.soundDesign.delete({ where: { id: soundDesignId } });
    await Promise.all(
      MEDIA.map(({ field, resourceType }) => destroyAsset(existing[field], resourceType))
    );
    return res.status(200).json({ message: "Sound design reel deleted successfully." });
  } catch (error) {
    return sendError(res, error, `Sound design ${req.method} error`);
  }
}

export default withAuth(handler);
