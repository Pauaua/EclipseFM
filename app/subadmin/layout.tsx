import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SubadminSidebar } from "@/components/subadmin/SubadminSidebar";
import { ProfileButton } from "@/components/profile/ProfileButton";
import { prisma } from "@/lib/prisma";

export default async function SubadminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || session.user.role !== "SUBADMIN") redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { nombre: true, apellido: true, email: true, username: true, telefono: true, direccion: true, role: true },
  });

  return (
    <div className="min-h-screen" style={{ background: "#0D0825" }}>
      <SubadminSidebar />

      <div className="ml-[240px] min-h-screen flex flex-col">
        <header
          className="flex items-center justify-between px-8 py-4 sticky top-0 z-10"
          style={{
            background: "rgba(13,8,37,0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(124,58,237,0.1)",
          }}
        >
          <div />
          <ProfileButton
            user={dbUser ?? session.user}
            sublabel="Sub-Administrador"
          />
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
