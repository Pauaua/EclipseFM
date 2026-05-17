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

export const metadata: Metadata = {
  title: "Eclipse FM 107.7 — Panel Interno",
  description: "Panel de gestión interno de Radio Eclipse FM",
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
