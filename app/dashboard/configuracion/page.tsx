import { auth } from "@/lib/auth";

export default async function ConfiguracionPage() {
  const session = await auth();
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Configuración</h1>
        <p className="text-[#7B6FA0] text-sm mt-0.5">Información de cuenta y sistema</p>
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
              <span className="text-[#E8D44D] font-medium">Administrador</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1C1040] border border-[rgba(168,85,247,0.1)] rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">Sistema</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#7B6FA0]">Versión</span>
              <span className="text-white">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7B6FA0]">Framework</span>
              <span className="text-white">Next.js 14 (App Router)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7B6FA0]">Base de datos</span>
              <span className="text-white">PostgreSQL (Neon)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
