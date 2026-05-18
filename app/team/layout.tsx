import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { EclipseLogo } from "@/components/EclipseLogo";
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
    <div className="min-h-screen bg-[#0D0825]">
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

        <ProfileButton
          user={dbUser ?? session.user}
          sublabel="Equipo Eclipse FM"
        />
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
