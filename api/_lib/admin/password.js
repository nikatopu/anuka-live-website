import prisma from "../../../src/lib/prisma.js";
import bcrypt from "bcrypt";
import withAuth from "../withAuth.js";
import { setSessionCookie } from "../session.js";
import { readJsonBody, methodNotAllowed } from "../request.js";

const MIN_PASSWORD_LENGTH = 12;
const BCRYPT_ROUNDS = 12;

async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(req, res, ["POST"]);

  const body = readJsonBody(req);
  const currentPassword = typeof body?.currentPassword === "string" ? body.currentPassword : "";
  const newPassword = typeof body?.newPassword === "string" ? body.newPassword : "";

  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    return res
      .status(400)
      .json({ message: `New password must be at least ${MIN_PASSWORD_LENGTH} characters.` });
  }
  // bcrypt ignores everything past 72 bytes
  if (Buffer.byteLength(newPassword) > 72) {
    return res.status(400).json({ message: "New password must be at most 72 bytes." });
  }

  try {
    const isCurrentValid = await bcrypt.compare(currentPassword, req.admin.password);
    if (!isCurrentValid) {
      return res.status(400).json({ message: "Current password is incorrect." });
    }

    // Bumping tokenVersion logs out every other session
    const admin = await prisma.admin.update({
      where: { id: req.admin.id },
      data: {
        password: await bcrypt.hash(newPassword, BCRYPT_ROUNDS),
        tokenVersion: { increment: 1 },
      },
    });

    setSessionCookie(res, admin);
    return res.status(200).json({ message: "Password changed." });
  } catch (error) {
    console.error("Password change error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default withAuth(handler);
