import type { Metadata } from "next";
import Link from "next/link";
import { getPrograms } from "@/lib/actions/programs.actions";
import { PageHero } from "@/components/public/ui/PageHero";
import { SectionTag } from "@/components/public/ui/SectionTag";
import { ProgramasClient } from "./ProgramasClient";

export const metadata: Metadata = {
  title: "Programas",
  description: "Descubre todos los programas de Radio Eclipse FM 107.7. Música, entretenimiento e información desde Quilicura.",
  openGraph: { title: "Programas | Eclipse FM 107.7", description: "Todos los programas de Eclipse FM 107.7 — Quilicura." },
};

export default async function ProgramasPage() {
  const programas = await getPrograms(true);

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
            <ProgramasClient programas={programas} />
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
