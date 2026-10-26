import { getSessionAdmin } from "./session.js";
import { isJsonRequest } from "./request.js";

const BODY_METHODS = ["POST", "PUT", "PATCH"];

const withAuth = (handler) => {
  return async (req, res) => {
    res.setHeader("Cache-Control", "no-store");

    // Requiring a JSON content type forces a CORS preflight for cross-site requests,
    // which (with no CORS headers configured) the browser refuses. Defense in depth
    // on top of the SameSite=Strict session cookie.
    if (BODY_METHODS.includes(req.method) && !isJsonRequest(req)) {
      return res.status(415).json({ message: "Expected a JSON request body" });
    }

    try {
      const admin = await getSessionAdmin(req);
      if (!admin) {
        return res.status(401).json({ message: "Not logged in or session expired" });
      }
      req.admin = admin;
    } catch (error) {
      console.error("Auth error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    return handler(req, res);
  };
};

export default withAuth;
