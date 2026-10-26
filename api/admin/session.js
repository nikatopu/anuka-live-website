import withAuth from "../_lib/withAuth.js";
import { methodNotAllowed } from "../_lib/request.js";

// Lets the admin UI check whether its (HttpOnly) session cookie is still valid
async function handler(req, res) {
  if (req.method !== "GET") return methodNotAllowed(req, res, ["GET"]);
  return res.status(200).json({ username: req.admin.username });
}

export default withAuth(handler);
