import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { getPendingProposalsCount } from "@/lib/actions/proposals.actions";
import { ProfileButton } from "@/components/profile/ProfileButton";
import { prisma } from "@/lib/prisma";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUBADMIN")) redirect("/login");

  const [pendingCount, dbUser] = await Promise.all([
    getPendingProposalsCount(),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { nombre: true, apellido: true, email: true, username: true, telefono: true, direccion: true, role: true },
    }),
  ]);

  return (
    <div className="min-h-screen" style={{ background: "#0D0825" }}>
      <Sidebar pendingCount={pendingCount} role={session.user.role} />

      <div className="lg:ml-[240px] min-h-screen flex flex-col">
        <header
          className="flex items-center justify-between px-4 sm:px-8 py-4 sticky top-0 z-10 mt-[52px] lg:mt-0"
          style={{
            background: "rgba(13,8,37,0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(124,58,237,0.1)",
          }}
        >
          <div />
          <ProfileButton
            user={dbUser ?? session.user}
            sublabel={session.user.role === "SUBADMIN" ? "Sub-Administrador" : "Administrador"}
          />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
