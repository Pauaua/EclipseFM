import { getPrograms } from "@/lib/actions/programs.actions";
import { Badge } from "@/components/ui/Badge";

export default async function SubadminProgramasPage() {
  const programs = await getPrograms(true);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Programas</h1>
        <p className="text-[#7B6FA0] text-sm mt-0.5">Vista de la programación activa — solo lectura</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {programs.map((p) => (
          <div key={p.id} className="bg-[#1C1040] border border-[rgba(168,85,247,0.1)] rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-white">{p.titulo}</h3>
                <p className="text-xs text-[#A89EC0] mt-0.5">🎙 {p.conductor}</p>
              </div>
              <Badge value={p.categoria} />
            </div>
            <p className="text-xs text-[#7B6FA0] mb-3 line-clamp-2">{p.descripcion}</p>
            <div className="text-xs text-[#A89EC0] space-y-1 pt-3 border-t border-[rgba(124,58,237,0.1)]">
              <p>⏰ {p.horarioInicio} – {p.horarioFin}</p>
              <p>📅 {p.dias.join(", ")}</p>
            </div>
          </div>
        ))}
        {programs.length === 0 && (
          <p className="col-span-3 text-center text-[#7B6FA0] py-16">No hay programas activos.</p>
        )}
      </div>
    </div>
  );
}
