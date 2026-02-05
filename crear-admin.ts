import 'dotenv/config'
import prisma from './src/utils/prisma';
import * as bcrypt from 'bcryptjs';

async function main() {
  console.log("⏳ Creando usuario Admin...");
  
  const password = "admin123"; // 👈 TU CONTRASEÑA
  const hashedPassword = await bcrypt.hash(password, 10);

  // Intentamos crear el usuario. Si ya existe, lo actualiza.
  const user = await prisma.user.upsert({
    where: { email: "pastor@iglesia4c.com" },
    update: {}, // Si existe, no hace nada
    create: {
      email: "pastor@iglesia4c.com",
      nombre: "Pastor Admin",
      password: hashedPassword,
      role: "ADMIN",
      sede: "Central"
    },
  });

  console.log(`✅ ¡USUARIO LISTO! Email: ${user.email} | Pass: ${password}`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());