import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { getPendingProposalsCount } from "@/lib/actions/proposals.actions";
import { logoutAction } from "@/lib/actions/auth.actions";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  const pendingCount = await getPendingProposalsCount();

  return (
    <div className="min-h-screen" style={{ background: "#0D0825" }}>
      <Sidebar pendingCount={pendingCount} />

      <div className="ml-[240px] min-h-screen flex flex-col">
        {/* Header */}
        <header
          className="flex items-center justify-between px-8 py-4 sticky top-0 z-10"
          style={{
            background: "rgba(13,8,37,0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(124,58,237,0.1)",
          }}
        >
          <div />
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-white">
                {session.user.nombre} {session.user.apellido}
              </p>
              <p className="text-xs text-[#7B6FA0]">Administrador</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#E8D44D] flex items-center justify-center text-[#0D0825] font-bold text-sm">
              {session.user.nombre[0]}
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-xs text-[#7B6FA0] hover:text-red-400 transition-colors px-2 py-1"
              >
                Salir
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
