import type { Metadata } from "next";
import { getPrograms } from "@/lib/actions/programs.actions";

export const metadata: Metadata = {
  title: "Programas",
  description: "Descubre todos los programas de Radio Eclipse FM 107.7. Música, entretenimiento e información desde Quilicura.",
  openGraph: { title: "Programas | Eclipse FM 107.7", description: "Todos los programas de Eclipse FM 107.7 — Quilicura." },
};
import { PageHero } from "@/components/public/ui/PageHero";
import { SectionTag } from "@/components/public/ui/SectionTag";
import { ProgramCard } from "@/components/public/ui/ProgramCard";
import Link from "next/link";

export default async function ProgramasPage() {
  const programas = await getPrograms(true);

  const categorias = ["TODOS", ...Array.from(new Set(programas.map(p => p.categoria)))];

  return (
    <>
      <PageHero
        breadcrumb="Programas"
        titleWhite="Nuestra"
        titleYellow="Programación"
        subtitle="Descubre todos los programas que Eclipse FM tiene para ti, con las mejores voces de Quilicura."
      />

      <section className="py-20 px-6 bg-space-deep">
        <div className="max-w-6xl mx-auto">
          <SectionTag text="En el aire" />

          {programas.length > 0 ? (
            <>
              {/* Categorías - visual only */}
              <div className="flex flex-wrap gap-2 mb-10">
                {categorias.map((cat) => (
                  <span
                    key={cat}
                    className="px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase transition-colors cursor-default"
                    style={
                      cat === "TODOS"
                        ? { background: "rgba(232,212,77,0.15)", border: "1px solid rgba(232,212,77,0.3)", color: "#E8D44D" }
                        : { background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", color: "#A89EC0" }
                    }
                  >
                    {cat === "TODOS" ? "Todos" : cat.replace(/_/g, " ")}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programas.map(p => <ProgramCard key={p.id} program={p} />)}
              </div>
            </>
          ) : (
            <div className="text-center py-24">
              <p className="text-gray-mid text-lg mb-2">Próximamente</p>
              <p className="text-gray-dark text-sm">Estamos preparando nuestra programación completa.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-space-black">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-display text-3xl text-white tracking-wide mb-4">¿Quieres ser parte de Eclipse FM?</h3>
          <p className="text-gray-soft text-[15px] mb-8">Envíanos tu propuesta de programa y hagamos radio juntos.</p>
          <Link
            href="/contacto"
            className="inline-block px-8 py-3 rounded-full font-bold text-space-black text-sm transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(90deg,#E8D44D,#F5E878)" }}
          >
            Enviar propuesta →
          </Link>
        </div>
      </section>
    </>
  );
}
