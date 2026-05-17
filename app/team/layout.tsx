import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { EclipseLogo } from "@/components/EclipseLogo";
import { logoutAction } from "@/lib/actions/auth.actions";

export default async function TeamLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || session.user.role !== "TEAM") redirect("/login");

  return (
    <div className="min-h-screen bg-[#0D0825]">
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-4 sticky top-0 z-10"
        style={{
          background: "rgba(13,8,37,0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(124,58,237,0.12)",
        }}
      >
        <div className="flex items-center gap-3">
          <EclipseLogo size={36} />
          <div>
            <p className="font-display text-xl tracking-widest text-[#E8D44D]">ECLIPSE FM</p>
            <p className="text-[9px] text-[#7B6FA0] tracking-widest uppercase">107.7</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-white">
              {session.user.nombre} {session.user.apellido}
            </p>
            <p className="text-xs text-[#7B6FA0]">Equipo Eclipse FM</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#A855F7] flex items-center justify-center text-white font-bold text-sm">
            {session.user.nombre[0]}
          </div>
          <form action={logoutAction}>
            <button type="submit" className="text-xs text-[#7B6FA0] hover:text-red-400 transition-colors px-2 py-1">
              Salir
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
