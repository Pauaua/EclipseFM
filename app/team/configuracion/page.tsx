import { auth } from "@/lib/auth";

export default async function TeamConfiguracionPage() {
  const session = await auth();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Configuración</h1>
        <p className="text-[#7B6FA0] text-sm mt-0.5">Información de tu cuenta</p>
      </div>

      <div className="max-w-2xl space-y-4">
        <div className="bg-[#1C1040] border border-[rgba(168,85,247,0.1)] rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">Mi cuenta</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#7B6FA0]">Nombre</span>
              <span className="text-white">{session?.user.nombre} {session?.user.apellido}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7B6FA0]">Email</span>
              <span className="text-white">{session?.user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7B6FA0]">Rol</span>
              <span className="text-[#E8D44D] font-medium">Equipo Eclipse FM</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1C1040] border border-[rgba(168,85,237,0.1)] rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">Accesos</h2>
          <div className="space-y-3 text-sm">
            <a
              href="https://webmail.radioeclipsefm.cl:2096"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-[rgba(124,58,237,0.08)]"
              style={{ border: "1px solid rgba(124,58,237,0.15)" }}
            >
              <span className="text-[#A89EC0]">Webmail corporativo</span>
              <span className="text-[#E8D44D] text-xs">Abrir →</span>
            </a>
            <a
              href="/en-vivo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-[rgba(124,58,237,0.08)]"
              style={{ border: "1px solid rgba(124,58,237,0.15)" }}
            >
              <span className="text-[#A89EC0]">Transmision en vivo</span>
              <span className="text-[#E8D44D] text-xs">Abrir →</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
