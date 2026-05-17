import { getPrograms } from "@/lib/actions/programs.actions";
import { ProgramasClient } from "./ProgramasClient";

export default async function ProgramasPage() {
  const programs = await getPrograms();
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Programas</h1>
        <p className="text-[#7B6FA0] text-sm mt-0.5">Grilla de programación de Eclipse FM</p>
      </div>
      <ProgramasClient initialPrograms={programs} />
    </div>
  );
}
