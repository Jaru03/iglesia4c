import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL ?? "postgresql://postgres:postgres@localhost:5433/iglesia4c",
});
const prisma = new PrismaClient({ adapter });

const ADMIN_EMAILS: { email: string; name: string; lastname: string }[] = [
  { email: "secretaria@casadedios.es", name: "Secretaria", lastname: "Casa de Dios" },
  { email: "josearudeveloper@gmail.com", name: "Jose", lastname: "Developer" },
  { email: "admin@casadedios.es", name: "Admin", lastname: "Casa de Dios" },
];

async function main() {
  const password = await bcrypt.hash("iglesia1234", 10);

  for (const { email, name, lastname } of ADMIN_EMAILS) {
    const person = await prisma.person.upsert({
      where: { email },
      update: {},
      create: { name, lastname, email, membershipStatus: "ACTIVE" },
    });
    await prisma.user.upsert({
      where: { personId: person.id },
      update: { role: "ADMIN" },
      create: { password, role: "ADMIN", personId: person.id },
    });
    console.log(`✅ ${email} → ADMIN`);
  }

  console.log("   Contraseña: iglesia1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
