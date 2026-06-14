import { checkStreaming } from "@/lib/actions/streaming.actions";
import { StreamingClient } from "@/app/dashboard/streaming/StreamingClient";

export default async function TeamStreamingPage() {
  const initial = await checkStreaming();
  return <StreamingClient initial={initial} />;
}
