import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { Role, UserStatus } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    nombre: string;
    apellido: string;
    role: Role;
    status: UserStatus;
  }
  interface Session {
    user: {
      id: string;
      nombre: string;
      apellido: string;
      email: string;
      role: Role;
      status: UserStatus;
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        if (user.status === "INACTIVE") {
          throw new Error("Cuenta desactivada");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!passwordMatch) return null;

        return {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          apellido: user.apellido,
          role: user.role,
          status: user.status,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.nombre = (user as { nombre: string }).nombre;
        token.apellido = (user as { apellido: string }).apellido;
        token.role = (user as { role: Role }).role;
        token.status = (user as { status: UserStatus }).status;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.nombre = token.nombre as string;
      session.user.apellido = token.apellido as string;
      session.user.role = token.role as Role;
      session.user.status = token.status as UserStatus;
      return session;
    },
  },
});
