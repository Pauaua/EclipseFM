-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TEAM');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ProposalType" AS ENUM ('PROGRAM_IDEA', 'REFERRAL', 'SPONSOR_SUGGESTION');

-- CreateEnum
CREATE TYPE "ProposalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ProgramCategory" AS ENUM ('MUSICA', 'ENTRETENIMIENTO', 'CIUDADANO', 'BIENESTAR', 'RETRO', 'CULTURAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telefono" TEXT,
    "direccion" TEXT,
    "role" "Role" NOT NULL DEFAULT 'TEAM',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "conductor" TEXT NOT NULL,
    "horarioInicio" TEXT NOT NULL,
    "horarioFin" TEXT NOT NULL,
    "dias" TEXT[],
    "categoria" "ProgramCategory" NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,
    "email" TEXT,
    "telefono" TEXT,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" TEXT NOT NULL,
    "tipo" "ProposalType" NOT NULL,
    "status" "ProposalStatus" NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,
    "adminNota" TEXT,
    "progTitulo" TEXT,
    "progDescripcion" TEXT,
    "progHorario" TEXT,
    "progDias" TEXT,
    "progConductor" TEXT,
    "refNombre" TEXT,
    "refEmail" TEXT,
    "refTelefono" TEXT,
    "refNota" TEXT,
    "sponEmpresa" TEXT,
    "sponContacto" TEXT,
    "sponEmail" TEXT,
    "sponNota" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
