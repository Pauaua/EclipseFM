import { getProposals } from "@/lib/actions/proposals.actions";
import { PropuestasClient } from "./PropuestasClient";

export default async function PropuestasPage() {
  const proposals = await getProposals();
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Propuestas</h1>
        <p className="text-[#7B6FA0] text-sm mt-0.5">Bandeja de ideas, referidos y sugerencias del equipo</p>
      </div>
      <PropuestasClient initialProposals={proposals} />
    </div>
  );
}
