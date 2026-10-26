// prisma/seed.js
// Creates the initial admin account if it doesn't exist yet. To change the
// password of an existing admin, use `npm run admin:password` instead.
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 12) {
    throw new Error("Set ADMIN_PASSWORD (at least 12 characters) to seed the admin account.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
