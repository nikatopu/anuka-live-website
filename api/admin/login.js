import prisma from "../../src/lib/prisma.js";
import bcrypt from "bcrypt";
import { setSessionCookie } from "../_lib/session.js";
import { isJsonRequest, readJsonBody, methodNotAllowed } from "../_lib/request.js";

const MAX_FAILED_ATTEMPTS = 5;
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;

// Compared against when the username doesn't exist, so response timing
// doesn't reveal which usernames are valid
const DUMMY_HASH = "$2b$12$wmBE71tucM1qzemYmpdH4.40yBW9MAEVg.s9Jqf7PfKIz/dkZWw96";

// Vercel sets these headers itself; client-supplied values are overwritten
const clientIp = (req) =>
  (
    req.headers["x-real-ip"] ||
    (req.headers["x-forwarded-for"] || "").split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown"
  ).trim();

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") return methodNotAllowed(req, res, ["POST"]);
  if (!isJsonRequest(req)) {
    return res.status(415).json({ message: "Expected a JSON request body" });
  }

  const body = readJsonBody(req);
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!username || !password || username.length > 100 || password.length > 200) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const ip = clientIp(req);
    const windowStart = new Date(Date.now() - ATTEMPT_WINDOW_MS);

    await prisma.loginAttempt.deleteMany({ where: { createdAt: { lt: windowStart } } });
    const recentFailures = await prisma.loginAttempt.count({ where: { ip } });
    if (recentFailures >= MAX_FAILED_ATTEMPTS) {
      res.setHeader("Retry-After", String(ATTEMPT_WINDOW_MS / 1000));
      return res
        .status(429)
        .json({ message: "Too many failed attempts. Try again in 15 minutes." });
    }

    const admin = await prisma.admin.findUnique({ where: { username } });
    const isPasswordValid = await bcrypt.compare(password, admin?.password ?? DUMMY_HASH);

    if (!admin || !isPasswordValid) {
      await prisma.loginAttempt.create({ data: { ip } });
      return res.status(401).json({ message: "Invalid credentials" });
    }

    await prisma.loginAttempt.deleteMany({ where: { ip } });
    setSessionCookie(res, admin);
    return res.status(200).json({ username: admin.username });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
