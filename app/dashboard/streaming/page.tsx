import { checkStreaming } from "@/lib/actions/streaming.actions";
import { StreamingClient } from "./StreamingClient";

export default async function StreamingPage() {
  const initial = await checkStreaming();
  return <StreamingClient initial={initial} />;
}
