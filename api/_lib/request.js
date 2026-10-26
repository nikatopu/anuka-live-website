// Shared request/response helpers for API routes.
// Files under api/_lib are not deployed as routes (underscore prefix).
import { ValidationError } from "./validate.js";

export const isJsonRequest = (req) =>
  (req.headers["content-type"] || "").toLowerCase().startsWith("application/json");

// Vercel parses JSON bodies lazily and throws on malformed input
export function readJsonBody(req) {
  try {
    const body = req.body;
    return body && typeof body === "object" && !Array.isArray(body) ? body : null;
  } catch {
    return null;
  }
}

export function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export function methodNotAllowed(req, res, allowed) {
  res.setHeader("Allow", allowed);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}

export function sendError(res, error, context) {
  if (error instanceof ValidationError) {
    return res.status(400).json({ message: error.message });
  }
  console.error(`${context}:`, error);
  return res.status(500).json({ message: "Internal Server Error" });
}
