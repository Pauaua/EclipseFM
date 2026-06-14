"use server";

export type StreamStatus = {
  online: boolean;
  latency: number | null;
  checkedAt: string;
};

async function checkEndpoint(url: string): Promise<StreamStatus> {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(6000),
      cache: "no-store",
    });
    const latency = Date.now() - start;
    return { online: res.ok || res.status === 200 || res.status === 206, latency, checkedAt: new Date().toISOString() };
  } catch {
    return { online: false, latency: null, checkedAt: new Date().toISOString() };
  }
}

export async function checkStreaming() {
  const [radio, tv] = await Promise.all([
    checkEndpoint("https://audio2.tustreaming.cl/8030/stream"),
    checkEndpoint("https://tv.tustreaming.cl/player.php?id=eclipsetv"),
  ]);
  return { radio, tv };
}
