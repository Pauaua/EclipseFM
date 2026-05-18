import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contáctate con Radio Eclipse FM 107.7. Teléfono, correo y ubicación en Quilicura, Chile.",
  openGraph: {
    title: "Contacto | Eclipse FM 107.7",
    description: "Escríbenos o visítanos. Estamos en Av. O'Higgins #208, Quilicura.",
  },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
