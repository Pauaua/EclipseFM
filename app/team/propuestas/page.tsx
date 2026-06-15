import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getProposals } from "@/lib/actions/proposals.actions";
import { PropuestasReadOnly } from "./PropuestasReadOnly";

export default async function TeamPropuestasPage() {
  const session = await auth();
  if (session?.user.role !== "SUBADMIN") redirect("/team");

  const proposals = await getProposals();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Propuestas</h1>
        <p className="text-[#7B6FA0] text-sm mt-0.5">Ideas y sugerencias del equipo — solo lectura</p>
      </div>
      <PropuestasReadOnly initialProposals={proposals} />
    </div>
  );
}
