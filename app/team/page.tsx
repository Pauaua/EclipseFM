import { auth } from "@/lib/auth";
import { getPrograms } from "@/lib/actions/programs.actions";
import { checkStreaming } from "@/lib/actions/streaming.actions";
import { TeamPageClient } from "./TeamPageClient";

export default async function TeamPage() {
  const session = await auth();
  const [programs, streaming] = await Promise.all([
    getPrograms(true),
    checkStreaming(),
  ]);

  return (
    <TeamPageClient
      userName={session!.user.nombre}
      userId={session!.user.id}
      programs={programs}
      streaming={streaming}
    />
  );
}
