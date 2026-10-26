// Sets (or creates) an admin account's password and logs out all of its sessions.
//
// Usage:  npm run admin:password -- <username>
// An unknown username creates a new admin account.
// Needs DATABASE_URL, either in the shell environment or in a local .env file
// (e.g. `npx vercel env pull .env --environment=production`).
import readline from "node:readline";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const MIN_PASSWORD_LENGTH = 12;
const BCRYPT_ROUNDS = 12;

function askHidden(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
  rl._writeToOutput = (text) => {
    if (!rl.muted) rl.output.write(text);
  };
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });
    rl.muted = true;
  });
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Put it in .env or export it in your shell.");
  }

  const username = process.argv[2];
  if (!username) {
    throw new Error("Pass the admin username: npm run admin:password -- <username>");
  }

  const prisma = new PrismaClient();
  try {
    const exists = await prisma.admin.findUnique({ where: { username } });
    if (!exists) console.log(`No admin named "${username}" yet; a new account will be created.`);
    await setPassword(prisma, username);
  } finally {
    await prisma.$disconnect();
  }
}

async function setPassword(prisma, username) {
  let password = await askHidden(`New password for "${username}" (leave empty to generate one): `);

  if (!password) {
    password = crypto.randomBytes(18).toString("base64url");
    console.log(`Generated password: ${password}\nStore it in a password manager now; it won't be shown again.`);
  } else {
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
    }
    if (Buffer.byteLength(password) > 72) {
      throw new Error("Password must be at most 72 bytes.");
    }
    if ((await askHidden("Repeat password: ")) !== password) {
      throw new Error("Passwords do not match.");
    }
  }

  const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
  await prisma.admin.upsert({
    where: { username },
    update: { password: hashedPassword, tokenVersion: { increment: 1 } },
    create: { username, password: hashedPassword },
  });
  console.log(`Password for "${username}" updated. Existing sessions have been logged out.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
