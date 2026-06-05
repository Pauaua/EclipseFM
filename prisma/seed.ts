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

  // Programas — eliminar existentes y recrear
  await prisma.program.deleteMany({});
  console.log("🗑️ Programas anteriores eliminados");

  const programs = [
    {
      titulo: "Gran Día Quilicura",
      descripcion: "Comienza el día con alegría, conversación y toda la energía junto a Leito Bahamondes. Un espacio pensado para la comunidad de Quilicura con música chilena, ritmos bailables, concursos, noticias, entretenimiento, entrevistas y mucha participación ciudadana.",
      conductor: "Leito Bahamondes Durán",
      horarioInicio: "08:00",
      horarioFin: "10:00",
      dias: ["MARTES", "JUEVES"],
      categoria: ProgramCategory.CIUDADANO,
    },
    {
      titulo: "El Semillero",
      descripcion: "Misceláneo con entretención variada y noticias de la actualidad. Un espacio dinámico y fresco para acompañar tu tarde de lunes a viernes.",
      conductor: "Camilo Lucero",
      horarioInicio: "14:00",
      horarioFin: "16:00",
      dias: ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"],
      categoria: ProgramCategory.ENTRETENIMIENTO,
    },
    {
      titulo: "Como Ayer",
      descripcion: "Programa musical dedicado a la nueva ola nacional y sus paralelos de la bella época de fines de los 50, 60 y 70, incluyendo el neo folclore. Un viaje musical por la historia de nuestra cultura.",
      conductor: "Osvaldo Vicuña",
      horarioInicio: "18:00",
      horarioFin: "20:00",
      dias: ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"],
      categoria: ProgramCategory.RETRO,
    },
    {
      titulo: "Mezcla Perfecta",
      descripcion: "La mejor manera para finalizar el día. Únete a la comunidad del rompeparlantes con lo mejor de la movida tropical y pachanga retro, combinado con puro entretenimiento.",
      conductor: "Rock DJ",
      horarioInicio: "20:00",
      horarioFin: "22:00",
      dias: ["LUNES", "MARTES", "MIERCOLES", "JUEVES"],
      categoria: ProgramCategory.ENTRETENIMIENTO,
    },
    {
      titulo: "Respira HipHop",
      descripcion: "Programa dedicado a la cultura del hip-hop hispano y la black music nacional. Entrevistas con artistas, sesiones de freestyle y la esencia de la cultura urbana cada viernes.",
      conductor: "Jonathan González",
      horarioInicio: "20:00",
      horarioFin: "22:00",
      dias: ["VIERNES"],
      categoria: ProgramCategory.MUSICA,
    },
    {
      titulo: "Eclipse Full Mix",
      descripcion: "Cada fin de semana Rock DJ convierte la radio en una pista de baile, mezclando los ritmos clásicos con los hits del momento. La fiesta de Quilicura empieza aquí.",
      conductor: "Rock DJ",
      horarioInicio: "22:00",
      horarioFin: "00:00",
      dias: ["VIERNES", "SABADO"],
      categoria: ProgramCategory.MUSICA,
    },
    {
      titulo: "Quilicura Arriba de la Pelota",
      descripcion: "Un programa Cultural, Social, Deportivo y de Oportunidades para la comunidad de Quilicura. Conducido por el carismático Enzo Tallarida Saavedra, el Loco Italiano.",
      conductor: "Enzo Tallarida Saavedra",
      horarioInicio: "16:00",
      horarioFin: "18:00",
      dias: ["DOMINGO"],
      categoria: ProgramCategory.CULTURAL,
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
