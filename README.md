# Eclipse FM 107.7

Sitio web oficial y panel de gestión de **Radio Eclipse FM 107.7**, Quilicura, Chile.

---

## Funcionalidades

### Sitio público
- **Inicio** — Hero animado, estadísticas, carrusel de auspiciadores y vista previa de contenido
- **En vivo** — Reproductor de audio en streaming con chat integrado (Cbox)
- **Programas** — Catálogo de programas activos de la radio
- **Programación** — Grilla semanal por día y horario
- **Blog** — Artículos con vista individual, relacionados y sidebar de auspiciadores
- **Noticias** — Noticias de Quilicura y Chile con vista destacada
- **Nosotros** — Historia, valores y equipo de la radio
- **Contacto** — Formulario de contacto e información de ubicación

### Panel de administración
- **ADMIN**: gestión completa de usuarios, programas, auspiciadores, blog, noticias y propuestas
- **SUBADMIN**: gestión de blog y noticias
- **TEAM**: envío de propuestas y consulta de programación

---

## Stack

| Tecnología | Uso |
|---|---|
| Next.js 14 (App Router) | Framework principal |
| TypeScript | Tipado estático |
| NextAuth v5 | Autenticación con Credentials Provider |
| Prisma ORM | Acceso a base de datos |
| PostgreSQL (Neon) | Base de datos en la nube |
| Tailwind CSS | Estilos |
| Vercel | Deploy |

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
AUTH_SECRET="genera con: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
```

En producción, agrega estas mismas variables en **Vercel → Settings → Environment Variables**, con `NEXTAUTH_URL` apuntando a tu dominio de producción.

---

## Instalación y desarrollo

```bash
npm install
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

---

## Deploy

```bash
vercel --prod
```

Vercel ejecuta automáticamente `prisma generate && next build` según la configuración en `vercel.json`.


## Todos los derechos reservados - 2026 