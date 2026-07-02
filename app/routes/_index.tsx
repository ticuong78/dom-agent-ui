import type { Route } from "./+types/_index";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { LiveDemo } from "../components/LiveDemo";
import { Features } from "../components/Features";
import { Workflows } from "../components/Workflows";
import { Pricing } from "../components/Pricing";
import { Footer } from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "tracui · Pure algorithmic DOM diff" },
    {
      name: "description",
      content: "Catch DOM changes that matter, ignore the noise.",
    },
  ];
}

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col selection:bg-brand-500/30 selection:text-brand-900 font-sans bg-[#fafafa] text-[#334155]">
      <Navbar />

      <main className="grow pt-24 pb-0 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-dots opacity-60"></div>
        <div className="absolute top-20 right-0 w-150 h-150 bg-brand-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 pointer-events-none"></div>

        {/* Lắp ráp các Component vào đúng vị trí */}
        <Hero />
        <LiveDemo />
        <Features />
        <Workflows />
        <Pricing />
      </main>

      <Footer />
    </div>
  );
}
