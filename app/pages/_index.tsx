import type { Route } from "./+types/_index";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { LiveDemo } from "../components/LiveDemo";
import { Features } from "../components/Features";
import { Workflows } from "../components/Workflows";
import { Pricing } from "../components/Pricing";
import { Footer } from "../components/Footer";
import { createSupabaseServerClient } from "~/lib/supabase/supabase.server";
import { getProductStage } from "~/features/product_stage/product_stage.queries";
import { redirect } from "react-router";

export async function loader({ request }: Route.ActionArgs) {
  const { supabase, headers } = createSupabaseServerClient(request);

  const product_stage = await getProductStage(supabase);

  if (product_stage.product_stage === "pre_launch") {
    return redirect("/lookingforward!");
  }
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
