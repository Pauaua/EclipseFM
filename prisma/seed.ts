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
      descripcion: "Un espacio dedicado a la música chilena con interacción directa del público durante el horario de almuerzo. Incluye relatos culturales, noticias del mundo artístico y los mejores exponentes de la música folclórica nacional.",
      conductor: "Leo Bahamondes",
      horarioInicio: "13:00",
      horarioFin: "15:00",
      dias: ["MIERCOLES", "JUEVES", "VIERNES"],
      categoria: ProgramCategory.CULTURAL,
    },
    {
      titulo: "Respira HipHop",
      descripcion: "El espacio del hip-hop y la música urbana en Eclipse FM. Entrevistas con artistas, sesiones de freestyle, actuaciones en vivo e invitados especiales. Alexander y Jonathan llevan la esencia de la cultura hip-hop a las noches de Quilicura.",
      conductor: "Alexander y Jonathan",
      horarioInicio: "22:00",
      horarioFin: "00:00",
      dias: ["LUNES", "MARTES", "MIERCOLES", "JUEVES"],
      categoria: ProgramCategory.MUSICA,
    },
    {
      titulo: "Tarde de Locura",
      descripcion: "El programa de humor y entretenimiento del fin de semana. Segmentos cómicos, conversaciones con la audiencia, personajes únicos y la mejor energía para animar tu sábado por la tarde.",
      conductor: "Jimbo Animador",
      horarioInicio: "15:00",
      horarioFin: "17:00",
      dias: ["SABADO"],
      categoria: ProgramCategory.ENTRETENIMIENTO,
    },
    {
      titulo: "La Tarde Entremovida",
      descripcion: "El magazine de entretenimiento del fin de semana con música popular, cumbia, latin pop y lo mejor del género urbano. Kathya Neira te acompaña con mucha energía, interacción y los temas que mueven a Quilicura.",
      conductor: "Kathya Neira",
      horarioInicio: "13:00",
      horarioFin: "15:00",
      dias: ["SABADO"],
      categoria: ProgramCategory.ENTRETENIMIENTO,
    },
    {
      titulo: "Recuerdos al Atardecer",
      descripcion: "Una selección de clásicos musicales que acompaña el cierre de la tarde. Sergio Araya te lleva en un viaje por los grandes éxitos de siempre, perfectos para relajarse al caer el sol.",
      conductor: "Sergio Araya",
      horarioInicio: "17:00",
      horarioFin: "20:00",
      dias: ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"],
      categoria: ProgramCategory.RETRO,
    },
    {
      titulo: "Foro Ciudadano",
      descripcion: "El espacio de debate, entrevistas y análisis de la actualidad local con participación activa de la comunidad de Quilicura y sus autoridades. Una ventana abierta a la realidad que nos rodea.",
      conductor: "Dino Belmar",
      horarioInicio: "22:00",
      horarioFin: "00:00",
      dias: ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "DOMINGO"],
      categoria: ProgramCategory.CIUDADANO,
    },
    {
      titulo: "Tutti Frutti",
      descripcion: "El programa familiar de Eclipse FM con canciones clásicas, noticias amenas, humor y entretenimiento para toda la familia. Osvaldo y Germán Vicuña hacen del sábado por la mañana un momento de alegría y buen ambiente.",
      conductor: "Osvaldo y Germán Vicuña",
      horarioInicio: "10:00",
      horarioFin: "13:00",
      dias: ["SABADO"],
      categoria: ProgramCategory.ENTRETENIMIENTO,
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
