import 'dotenv/config'
import prisma from './src/utils/prisma';
import * as bcrypt from 'bcryptjs';

async function main() {
  console.log("⏳ Creando líderes de sede...");
  
  // La contraseña para todos (luego que cada uno la cambie)
  const password = "admin123"; 
  const hashedPassword = await bcrypt.hash(password, 10);

  const usuarios = [
    { email: "parla@casadedios.com", nombre: "Líder Parla", sede: "Parla" },
    { email: "castilla@casadedios.com", nombre: "Líder Castilla", sede: "Castilla" },
    { email: "pinto@casadedios.com", nombre: "Líder Pinto", sede: "Pinto" }
  ];

  for (const u of usuarios) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {}, 
      create: {
        email: u.email,
        nombre: u.nombre,
        password: hashedPassword,
        role: "ADMIN",
        sede: u.sede
      },
    });
    console.log(`✅ Creado: ${u.nombre} (${u.email})`);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());