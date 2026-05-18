import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "En Vivo",
  description: "Escucha Radio Eclipse FM 107.7 en vivo. Transmisión online 24/7 desde Quilicura para Chile y el mundo.",
  openGraph: {
    title: "En Vivo | Eclipse FM 107.7",
    description: "Escucha la señal en vivo de Eclipse FM 107.7 — Quilicura, Chile.",
  },
};

export default function EnVivoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
