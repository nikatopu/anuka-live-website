import prisma from "../../src/lib/prisma.js";
import withAuth from "../_lib/withAuth.js";
import { readBlogFields } from "../_lib/fields.js";
import { readJsonBody, methodNotAllowed, sendError } from "../_lib/request.js";

// POST: Create a blog post. The image is uploaded to Cloudinary by the browser first.
async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(req, res, ["POST"]);

  try {
    const data = readBlogFields(readJsonBody(req) || {});
    const newBlog = await prisma.blog.create({ data });
    return res.status(201).json(newBlog);
  } catch (error) {
    return sendError(res, error, "Blog creation error");
  }
}

export default withAuth(handler);
