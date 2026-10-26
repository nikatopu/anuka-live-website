import { clearSessionCookie } from "../_lib/session.js";
import { methodNotAllowed } from "../_lib/request.js";

export default function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(req, res, ["POST"]);

  clearSessionCookie(res);
  return res.status(200).json({ message: "Logged out" });
}
