import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: "postgresql://postgres:postgres@localhost:5433/iglesia4c",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("iglesia1234", 10);

  // Admin
  const adminPerson = await prisma.person.upsert({
    where: { email: "admin@iglesia.com" },
    update: {},
    create: {
      name: "Admin",
      lastname: "Principal",
      email: "admin@iglesia.com",
      membershipStatus: "MEMBER",
    },
  });
  await prisma.user.upsert({
    where: { personId: adminPerson.id },
    update: {},
    create: {
      password,
      role: "ADMIN",
      personId: adminPerson.id,
    },
  });

  // Member
  const memberPerson = await prisma.person.upsert({
    where: { email: "member@iglesia.com" },
    update: {},
    create: {
      name: "Juan",
      lastname: "Pérez",
      email: "member@iglesia.com",
      membershipStatus: "MEMBER",
    },
  });
  await prisma.user.upsert({
    where: { personId: memberPerson.id },
    update: {},
    create: {
      password,
      role: "MEMBER",
      personId: memberPerson.id,
    },
  });

  // User básico
  const userPerson = await prisma.person.upsert({
    where: { email: "user@iglesia.com" },
    update: {},
    create: {
      name: "María",
      lastname: "González",
      email: "user@iglesia.com",
      membershipStatus: "VISITOR",
    },
  });
  await prisma.user.upsert({
    where: { personId: userPerson.id },
    update: {},
    create: {
      password,
      role: "USER",
      personId: userPerson.id,
    },
  });

  console.log("✅ Usuarios creados:");
  console.log("   admin@iglesia.com  → ADMIN");
  console.log("   member@iglesia.com → MEMBER");
  console.log("   user@iglesia.com   → USER");
  console.log("   Contraseña de todos: iglesia1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
