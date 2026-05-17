import { getSponsors } from "@/lib/actions/sponsors.actions";
import { AuspiciadoresClient } from "./AuspiciadoresClient";

export default async function AuspiciadoresPage() {
  const sponsors = await getSponsors();
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Auspiciadores</h1>
        <p className="text-[#7B6FA0] text-sm mt-0.5">Empresas y contactos auspiciadores</p>
      </div>
      <AuspiciadoresClient initialSponsors={sponsors} />
    </div>
  );
}
