import type { Metadata } from "next";
import { PageHero } from "@/components/public/ui/PageHero";
import { SectionTag } from "@/components/public/ui/SectionTag";
import { equipo } from "@/lib/data/equipo";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce la historia de Radio Eclipse FM 107.7, 18 años al aire desde Quilicura para Chile y el mundo.",
  openGraph: { title: "Nosotros | Eclipse FM 107.7", description: "18 años al aire desde Quilicura. Conoce nuestra historia y equipo." },
};

const valores = [
  { icon: "📻", titulo: "Compromiso Comunitario", desc: "Somos la voz de Quilicura, comprometidos con el desarrollo y las necesidades de nuestra comunidad." },
  { icon: "🎵", titulo: "Pasión por la Música", desc: "Seleccionamos contenido musical de calidad que conecta con el alma de nuestros oyentes." },
  { icon: "🌐", titulo: "Alcance Digital", desc: "Transmitimos las 24 horas por internet para llegar a chilenos en todo el mundo." },
  { icon: "🤝", titulo: "Transparencia", desc: "Informamos con veracidad y responsabilidad, respetando siempre a nuestra audiencia." },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        breadcrumb="Nosotros"
        titleWhite="Quiénes"
        titleYellow="Somos"
        subtitle="Más de 18 años siendo la banda sonora de Quilicura y su comunidad."
      />

      {/* Historia */}
      <section className="py-14 md:py-20 px-6 bg-space-deep">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div>
            <SectionTag text="Nuestra historia" />
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-wide mb-5">Nacimos para conectar a Quilicura</h2>
            <div className="space-y-4 text-gray-soft text-sm sm:text-[15px] leading-relaxed">
              <p>
                Radio Eclipse FM 107.7, ubicada en <span className="text-yellow-DEFAULT">Av. O'Higgins #208 con Lo Bascuñán, Quilicura</span>,
                nació con la convicción de que la comunidad merecía una radio propia: una voz que reflejara sus historias,
                su música y sus sueños.
              </p>
              <p>
                Fundada por Richard Acuña Briceño, la misión de Eclipse FM es servir a la comunidad de Quilicura a través
                de la información, el entretenimiento y la participación activa. Participamos en actividades solidarias,
                eventos comunitarios y somos la banda sonora del día a día de miles de quilicuranos.
              </p>
              <p>
                Hoy, con más de <span className="text-yellow-DEFAULT font-semibold">10.000 oyentes diarios</span>,
                más de 18 años en el rubro radial y transmisión online 24/7, seguimos creciendo con el mismo espíritu
                de servicio y amor por la radio.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { num: "2008", label: "Año de fundación" },
              { num: "+10K", label: "Oyentes diarios" },
              { num: "107.7", label: "Frecuencia FM" },
              { num: "24/7", label: "En el aire" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-4 sm:p-6 flex flex-col items-center text-center"
                style={{ background: "rgba(21,10,53,0.6)", border: "1px solid rgba(124,58,237,0.15)" }}
              >
                <span
                  className="font-display text-3xl sm:text-4xl mb-1"
                  style={{
                    background: "linear-gradient(90deg,#E8D44D,#F5E878)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >{s.num}</span>
                <span className="text-[10px] text-gray-mid uppercase tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director quote */}
      <section className="py-12 md:py-16 px-6 bg-space-black">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="rounded-2xl px-6 py-10 sm:px-10 sm:py-12"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(21,10,53,0.8) 100%)",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            <span className="text-4xl sm:text-5xl text-purple-DEFAULT opacity-40 font-serif leading-none block mb-4">"</span>
            <p className="font-display text-lg sm:text-xl md:text-2xl text-white tracking-wide leading-relaxed mb-6">
              Eclipse FM no es solo una radio, es el corazón que late junto a Quilicura todos los días.
            </p>
            <div className="flex items-center justify-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-xl"
                style={{ background: "rgba(232,212,77,0.15)", border: "1px solid rgba(232,212,77,0.3)" }}
              >🎙️</div>
              <div className="text-left">
                <p className="text-white text-sm font-semibold">Richard Acuña Briceño</p>
                <p className="text-gray-mid text-xs">Director General · Eclipse FM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-14 md:py-20 px-6 bg-space-deep">
        <div className="max-w-5xl mx-auto">
          <SectionTag text="Lo que nos define" />
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-wide mb-8">Nuestros Valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {valores.map((v) => (
              <div
                key={v.titulo}
                className="rounded-xl p-5"
                style={{ background: "rgba(21,10,53,0.5)", border: "1px solid rgba(124,58,237,0.12)" }}
              >
                <span className="text-3xl block mb-3">{v.icon}</span>
                <h3 className="text-white font-semibold text-sm mb-2">{v.titulo}</h3>
                <p className="text-gray-soft text-[13px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-14 md:py-20 px-6 bg-space-black">
        <div className="max-w-6xl mx-auto">
          <SectionTag text="Las voces detrás" />
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-wide mb-8">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {equipo.map((m) => (
              <div
                key={m.id}
                className="rounded-xl p-5 flex flex-col gap-3 group transition-all hover:scale-[1.02]"
                style={{ background: "rgba(21,10,53,0.5)", border: "1px solid rgba(124,58,237,0.12)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-3xl mx-auto"
                  style={{ background: "rgba(232,212,77,0.1)", border: "1px solid rgba(232,212,77,0.2)" }}
                >{m.emoji}</div>
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">{m.nombre}</p>
                  <p className="text-yellow-DEFAULT text-[11px] tracking-wide uppercase mt-0.5">{m.rol}</p>
                  <p className="text-gray-mid text-[11px] mt-0.5">{m.programa}</p>
                </div>
                <p className="text-gray-soft text-[12px] leading-relaxed text-center">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
