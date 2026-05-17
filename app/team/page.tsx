import { auth } from "@/lib/auth";
import { getPrograms } from "@/lib/actions/programs.actions";
import { TeamPageClient } from "./TeamPageClient";

export default async function TeamPage() {
  const session = await auth();
  const programs = await getPrograms(true); // solo activos

  return (
    <TeamPageClient
      userName={session!.user.nombre}
      userId={session!.user.id}
      programs={programs}
    />
  );
}
