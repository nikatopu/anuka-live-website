import prisma from "../../../../src/lib/prisma.js";
import withAuth from "../../withAuth.js";
import { destroyAsset } from "../../media.js";
import { readBlogFields, withoutEmptyMedia } from "../../fields.js";
import { parseId, readJsonBody, methodNotAllowed, sendError } from "../../request.js";

async function handler(req, res) {
  const blogId = parseId(req.query.id);
  if (!blogId) return res.status(400).json({ message: "Invalid blog ID." });

  if (req.method !== "PUT" && req.method !== "DELETE") {
    return methodNotAllowed(req, res, ["PUT", "DELETE"]);
  }

  try {
    const existing = await prisma.blog.findUnique({ where: { id: blogId } });
    if (!existing) return res.status(404).json({ message: "Blog post not found." });

    // PUT: Update a blog post, optionally replacing its image
    if (req.method === "PUT") {
      const fields = readBlogFields(readJsonBody(req) || {}, { isUpdate: true });
      const data = withoutEmptyMedia(fields, ["imageUrl"]);
      const updated = await prisma.blog.update({ where: { id: blogId }, data });

      if (data.imageUrl && data.imageUrl !== existing.imageUrl) {
        await destroyAsset(existing.imageUrl, "image");
      }
      return res.status(200).json(updated);
    }

    // DELETE: Remove the record first, then clean up its image
    await prisma.blog.delete({ where: { id: blogId } });
    await destroyAsset(existing.imageUrl, "image");
    return res.status(200).json({ message: "Blog deleted successfully." });
  } catch (error) {
    return sendError(res, error, `Blog ${req.method} error`);
  }
}

export default withAuth(handler);
