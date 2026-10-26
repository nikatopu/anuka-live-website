import withAuth from "../_lib/withAuth.js";
import { signUpload } from "../_lib/media.js";
import { readJsonBody, methodNotAllowed } from "../_lib/request.js";

// Issues a short-lived signature that lets the browser upload one file
// directly to a specific Cloudinary folder
async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(req, res, ["POST"]);

  try {
    const signed = signUpload(readJsonBody(req)?.target);
    if (!signed) return res.status(400).json({ message: "Unknown upload target." });
    return res.status(200).json(signed);
  } catch (error) {
    console.error("Upload signature error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default withAuth(handler);
