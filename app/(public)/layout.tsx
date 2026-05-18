import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { OnAirBar } from "@/components/public/OnAirBar";
import { WhatsAppButton } from "@/components/public/WhatsAppButton";
import { StarField } from "@/components/public/ui/StarField";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-space-deep flex flex-col relative">
      {/* Universo de fondo — presente en todas las páginas */}
      <StarField />

      <Navbar />
      <main className="flex-1 pb-14 relative z-10">{children}</main>
      <Footer />
      <OnAirBar />
      <WhatsAppButton />
    </div>
  );
}
