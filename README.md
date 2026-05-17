# Eclipse FM 107.7 — Panel Interno

Panel de gestión interno para Radio Eclipse FM, construido con Next.js 14, NextAuth v5, Prisma y PostgreSQL (Neon).

## Stack

- **Framework**: Next.js 14 (App Router)
- **Auth**: NextAuth v5 (beta) con Credentials Provider
- **ORM**: Prisma
- **DB**: PostgreSQL vía Neon
- **Estilos**: Tailwind CSS
- **Deploy**: Vercel

---

## 1. Crear la base de datos en Neon

1. Ir a [neon.tech](https://neon.tech) y crear una cuenta
2. Crear un nuevo proyecto (ej: `eclipse-fm`)
3. En el dashboard, copiar la **Connection String** (formato `postgresql://...`)
4. Guardarla como `DATABASE_URL` en tu `.env.local`

---

## 2. Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Base de datos (Neon)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# NextAuth — genera con: openssl rand -base64 32
AUTH_SECRET="tu-secreto-aqui"
NEXTAUTH_URL="http://localhost:3000"
```

### En Vercel

En el dashboard de Vercel, ve a **Settings → Environment Variables** y agrega:

| Variable | Valor |
|----------|-------|
| `DATABASE_URL` | Connection string de Neon |
| `AUTH_SECRET` | String aleatorio (openssl rand -base64 32) |
| `NEXTAUTH_URL` | URL de producción (ej: https://tuapp.vercel.app) |

---

## 3. Instalación local

```bash
npm install
```

---

## 4. Migraciones

```bash
# Crear las tablas en la DB
npx prisma migrate dev --name init

# O en producción (sin crear migrations):
npx prisma db push
```

---

## 5. Seed (datos iniciales)

```bash
# Local
npm run db:seed

# En producción (desde Vercel o CLI):
npx tsx prisma/seed.ts
```

El seed crea:
- **Admin**: `admin@eclipsefm.cl` / `Eclipse2025!`
- **3 usuarios TEAM** de prueba
- **5 programas** de ejemplo
- **2 sponsors** de ejemplo

---

## 6. Desarrollo local

```bash
npm run dev
# → http://localhost:3000
```

---

## 7. Deploy en Vercel

```bash
# Instalar CLI de Vercel
npm i -g vercel

# Deploy
vercel

# O conectar el repo desde vercel.com
```

Vercel ejecuta automáticamente `prisma generate && next build` gracias al `buildCommand` en `vercel.json`.

Para correr el seed en producción:

```bash
npx prisma db push && npx tsx prisma/seed.ts
```

---

## Estructura del proyecto

```
├── app/
│   ├── api/auth/[...nextauth]/   # NextAuth route handler
│   ├── dashboard/                # Panel Admin (ADMIN only)
│   │   ├── layout.tsx            # Sidebar + header
│   │   ├── page.tsx              # Resumen/stats
│   │   ├── usuarios/             # CRUD usuarios
│   │   ├── programas/            # CRUD programas
│   │   ├── auspiciadores/        # CRUD sponsors
│   │   ├── propuestas/           # Bandeja propuestas
│   │   └── configuracion/        # Info cuenta
│   ├── team/                     # Panel Equipo (TEAM only)
│   │   ├── layout.tsx
│   │   └── page.tsx              # Cards de acción + programación
│   ├── login/                    # Página de login
│   └── layout.tsx                # Root layout
├── components/
│   ├── ui/                       # Button, Input, Modal, Badge, etc.
│   ├── dashboard/Sidebar.tsx
│   └── EclipseLogo.tsx
├── lib/
│   ├── auth.ts                   # Configuración NextAuth
│   ├── prisma.ts                 # Singleton Prisma
│   └── actions/                  # Server Actions
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── middleware.ts                  # Protección de rutas
```

---

## Roles

| Rol | Acceso |
|-----|--------|
| `ADMIN` | `/dashboard/*` — gestión completa |
| `TEAM` | `/team` — propuestas + ver programación |
