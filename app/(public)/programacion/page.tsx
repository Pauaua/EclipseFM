import { getPrograms } from "@/lib/actions/programs.actions";
import { PageHero } from "@/components/public/ui/PageHero";
import { SectionTag } from "@/components/public/ui/SectionTag";

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const DIA_KEYS: Record<string, string> = {
  Lunes: "LUNES", Martes: "MARTES", Miércoles: "MIERCOLES",
  Jueves: "JUEVES", Viernes: "VIERNES", Sábado: "SABADO", Domingo: "DOMINGO",
};

const CAT_COLORS: Record<string, string> = {
  MUSICAL: "rgba(124,58,237,0.6)",
  NOTICIAS: "rgba(239,68,68,0.6)",
  ENTRETENIMIENTO: "rgba(232,212,77,0.6)",
  DEPORTES: "rgba(34,197,94,0.6)",
  CULTURAL: "rgba(236,72,153,0.6)",
  INFANTIL: "rgba(249,115,22,0.6)",
  RELIGIOSO: "rgba(99,102,241,0.6)",
  OTRO: "rgba(107,114,128,0.6)",
};

export default async function ProgramacionPage() {
  const programas = await getPrograms(true);

  return (
    <>
      <PageHero
        breadcrumb="Programación"
        titleWhite="Horario"
        titleYellow="Semanal"
        subtitle="Consulta cuándo escuchar tus programas favoritos de Eclipse FM 107.7."
      />

      <section className="py-20 px-6 bg-space-deep">
        <div className="max-w-6xl mx-auto">
          <SectionTag text="Esta semana" />

          {programas.length === 0 ? (
            <p className="text-gray-mid text-center py-20">La programación se publicará próximamente.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {DIAS.map((dia) => {
                const key = DIA_KEYS[dia];
                const programasDia = programas.filter(p => p.dias.includes(key));
                return (
                  <div
                    key={dia}
                    className="rounded-xl overflow-hidden"
                    style={{ border: "1px solid rgba(124,58,237,0.15)" }}
                  >
                    {/* Header día */}
                    <div
                      className="px-4 py-3"
                      style={{ background: "rgba(124,58,237,0.2)", borderBottom: "1px solid rgba(124,58,237,0.15)" }}
                    >
                      <p className="font-display text-lg text-white tracking-wide">{dia}</p>
                    </div>

                    {/* Programas del día */}
                    <div className="flex flex-col divide-y divide-purple-border/20" style={{ background: "rgba(8,4,26,0.6)" }}>
                      {programasDia.length === 0 ? (
                        <p className="text-gray-dark text-xs px-4 py-6 text-center">Sin programas</p>
                      ) : (
                        programasDia
                          .sort((a, b) => a.horarioInicio.localeCompare(b.horarioInicio))
                          .map(p => (
                            <div key={p.id} className="px-4 py-3 flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-2 h-2 rounded-full flex-shrink-0"
                                  style={{ background: CAT_COLORS[p.categoria] ?? CAT_COLORS.OTRO }}
                                />
                                <span className="text-yellow-DEFAULT text-[11px] font-mono font-bold">
                                  {p.horarioInicio} – {p.horarioFin}
                                </span>
                              </div>
                              <p className="text-white text-[13px] font-semibold leading-tight">{p.titulo}</p>
                              <p className="text-gray-mid text-[11px]">{p.conductor}</p>
                            </div>
                          ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Leyenda */}
          {programas.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-3">
              {Object.entries(CAT_COLORS).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                  <span className="text-gray-mid text-[11px] uppercase tracking-wide">{cat.replace(/_/g, " ")}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
