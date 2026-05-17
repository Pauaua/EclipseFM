import { PrismaClient, Role, UserStatus, ProgramCategory } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // Admin
  const adminPassword = await bcrypt.hash("Eclipse2025!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@eclipsefm.cl" },
    update: {},
    create: {
      nombre: "Richard",
      apellido: "Acuña",
      username: "admin",
      email: "admin@eclipsefm.cl",
      password: adminPassword,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });
  console.log("✅ Admin creado:", admin.email);

  // Team users
  const teamPassword = await bcrypt.hash("Team2025!", 12);
  const teamUsers = [
    {
      nombre: "Camila",
      apellido: "Rojas",
      username: "camila.rojas",
      email: "camila@eclipsefm.cl",
      telefono: "+56912345678",
    },
    {
      nombre: "Rodrigo",
      apellido: "Soto",
      username: "rodrigo.soto",
      email: "rodrigo@eclipsefm.cl",
      telefono: "+56987654321",
    },
    {
      nombre: "Valentina",
      apellido: "Muñoz",
      username: "valentina.munoz",
      email: "valentina@eclipsefm.cl",
      telefono: "+56911223344",
    },
  ];

  for (const u of teamUsers) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        ...u,
        password: teamPassword,
        role: Role.TEAM,
        status: UserStatus.ACTIVE,
      },
    });
    console.log("✅ Usuario TEAM creado:", u.email);
  }

  // Programas
  const programs = [
    {
      titulo: "Voces de Chile",
      descripcion:
        "Un espacio donde la cultura y el folclore chileno cobran vida a través de música, poesía y entrevistas con artistas nacionales.",
      conductor: "Patricia Mora",
      horarioInicio: "08:00",
      horarioFin: "10:00",
      dias: ["Lunes", "Miércoles", "Viernes"],
      categoria: ProgramCategory.CULTURAL,
    },
    {
      titulo: "Entre Boleros",
      descripcion:
        "La mejor selección de boleros latinoamericanos con historias detrás de cada canción y los intérpretes que las inmortalizaron.",
      conductor: "Manuel Figueroa",
      horarioInicio: "20:00",
      horarioFin: "22:00",
      dias: ["Martes", "Jueves"],
      categoria: ProgramCategory.MUSICA,
    },
    {
      titulo: "Tarde de Locura",
      descripcion:
        "El magazine de la tarde con humor, entretenimiento, concursos y la mejor compañía para tu tarde libre.",
      conductor: "Sofía Carrasco",
      horarioInicio: "14:00",
      horarioFin: "17:00",
      dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
      categoria: ProgramCategory.ENTRETENIMIENTO,
    },
    {
      titulo: "Foro Ciudadano",
      descripcion:
        "Debates, entrevistas y análisis de la actualidad local con la participación activa de la comunidad y autoridades regionales.",
      conductor: "Jorge Ahumada",
      horarioInicio: "12:00",
      horarioFin: "13:00",
      dias: ["Lunes", "Miércoles", "Viernes"],
      categoria: ProgramCategory.CIUDADANO,
    },
    {
      titulo: "Proyecto 90",
      descripcion:
        "Un viaje musical a través de los mejores éxitos de los años 90, con anécdotas, curiosidades y la nostalgia de una época dorada.",
      conductor: "Andrés Vega",
      horarioInicio: "22:00",
      horarioFin: "00:00",
      dias: ["Viernes", "Sábado"],
      categoria: ProgramCategory.RETRO,
    },
  ];

  for (const p of programs) {
    await prisma.program.create({ data: p });
    console.log("✅ Programa creado:", p.titulo);
  }

  // Sponsors de ejemplo
  const sponsors = [
    {
      empresa: "Ferretería El Martillo",
      contacto: "Carlos Pérez",
      email: "contacto@elmartillo.cl",
      telefono: "+56922334455",
      descripcion: "Patrocinador principal del programa Voces de Chile",
    },
    {
      empresa: "Clínica Dental Sonrisa",
      contacto: "Dra. Ana López",
      email: "info@sonrisa.cl",
      telefono: "+56933445566",
      descripcion: "Auspiciador del segmento de bienestar",
    },
  ];

  for (const s of sponsors) {
    await prisma.sponsor.create({ data: s });
    console.log("✅ Sponsor creado:", s.empresa);
  }

  console.log("🎉 Seed completado exitosamente");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
