import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TeamSidebar } from "@/components/team/TeamSidebar";
import { ProfileButton } from "@/components/profile/ProfileButton";
import { prisma } from "@/lib/prisma";

export default async function TeamLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || session.user.role !== "TEAM") redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { nombre: true, apellido: true, email: true, username: true, telefono: true, direccion: true, role: true },
  });

  return (
    <div className="min-h-screen" style={{ background: "#0D0825" }}>
      <TeamSidebar />

      <div className="lg:ml-[220px] min-h-screen flex flex-col">
        <header
          className="flex items-center justify-end px-4 sm:px-8 py-4 sticky top-0 z-10 mt-[52px] lg:mt-0"
          style={{
            background: "rgba(13,8,37,0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(124,58,237,0.1)",
          }}
        >
          <ProfileButton
            user={dbUser ?? session.user}
            sublabel="Equipo Eclipse FM"
          />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
