import jwt from "jsonwebtoken";
import prisma from "../../src/lib/prisma.js";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be set to at least 32 characters");
  }
  return secret;
}

// The cookie is HttpOnly (unreadable by page scripts), SameSite=Strict (not sent on
// cross-site requests) and scoped to the admin API only.
function writeCookie(res, value, maxAge) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${value}; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`
  );
}

export function setSessionCookie(res, admin) {
  const token = jwt.sign({ sub: String(admin.id), v: admin.tokenVersion }, getSecret(), {
    algorithm: "HS256",
    expiresIn: SESSION_TTL_SECONDS,
  });
  writeCookie(res, token, SESSION_TTL_SECONDS);
}

export function clearSessionCookie(res) {
  writeCookie(res, "", 0);
}

function readCookie(req, name) {
  for (const part of (req.headers.cookie || "").split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return null;
}

// Returns the logged-in admin, or null if the session is missing, invalid, expired or revoked
export async function getSessionAdmin(req) {
  const secret = getSecret();
  const token = readCookie(req, COOKIE_NAME);
  if (!token) return null;

  let payload;
  try {
    payload = jwt.verify(token, secret, { algorithms: ["HS256"] });
  } catch {
    return null;
  }

  const admin = await prisma.admin.findUnique({ where: { id: Number(payload.sub) } });
  if (!admin || admin.tokenVersion !== payload.v) return null;
  return admin;
}
