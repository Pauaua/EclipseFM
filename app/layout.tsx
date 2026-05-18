import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const BASE_URL = "https://eclipsefm.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Eclipse FM 107.7 — Quilicura, Chile",
    template: "%s | Eclipse FM 107.7",
  },
  description: "Radio Eclipse FM 107.7 — Tu radio en el espacio. Música, noticias y entretenimiento desde Quilicura para Chile y el mundo. Transmisión 24/7 online y en el aire.",
  keywords: ["Eclipse FM", "Radio Quilicura", "107.7 FM", "radio online Chile", "música chilena", "noticias Quilicura", "radio en vivo"],
  authors: [{ name: "Radio Eclipse FM", url: BASE_URL }],
  creator: "Radio Eclipse FM",
  publisher: "Radio Eclipse FM",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: BASE_URL,
    siteName: "Eclipse FM 107.7",
    title: "Eclipse FM 107.7 — Quilicura, Chile",
    description: "Tu radio en el espacio. Música, noticias y entretenimiento desde Quilicura para Chile y el mundo. 24/7 online.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Eclipse FM 107.7" }],
  },
  twitter: {
    card: "summary",
    title: "Eclipse FM 107.7 — Quilicura, Chile",
    description: "Tu radio en el espacio. Música, noticias y entretenimiento desde Quilicura para Chile y el mundo.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${bebasNeue.variable} font-body`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
