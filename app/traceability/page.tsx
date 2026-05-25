"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { LuxuryButton } from "@/components/rwama/LuxuryButton";

export default function TraceabilityIndexPage() {
  const [lotId, setLotId] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (lotId.trim()) {
      router.push(`/trace/${encodeURIComponent(lotId.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-forest)] flex items-center justify-center relative overflow-hidden">
      {/* Background & Atmospheric Lighting */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14] via-[#0d261a]/90 to-[#123524]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[rgba(200,169,107,0.15)] to-transparent rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[800px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 40, damping: 20 }}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(200,169,107,0.3)] bg-[rgba(200,169,107,0.05)] backdrop-blur-md text-[var(--color-gold)] text-[10px] tracking-[0.25em] uppercase mb-8">
            <MapPin className="w-3 h-3" /> Blockchain Traceability
          </span>
          
          <h1 className="text-[clamp(40px,6vw,72px)] leading-[1.05] text-[var(--color-cream)] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Trace Your <span className="italic text-[var(--color-gold)]">Coffee</span>
          </h1>
          
          <p className="text-lg text-[rgba(246,241,233,0.7)] max-w-[500px] mx-auto mb-12">
            Enter your Lot ID to explore the complete journey of your coffee, from the volcanic soils of Kirinyaga to export.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative max-w-[500px] mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-gold)] to-[#d4b675] rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative flex items-center bg-[rgba(246,241,233,0.05)] backdrop-blur-xl border border-[rgba(246,241,233,0.15)] rounded-full p-2 pl-6">
                <Search className="w-5 h-5 text-[rgba(246,241,233,0.5)]" />
                <input
                  type="text"
                  value={lotId}
                  onChange={(e) => setLotId(e.target.value)}
                  placeholder="e.g. RWA-2024-AA-001"
                  className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-[var(--color-cream)] placeholder-[rgba(246,241,233,0.3)] text-lg"
                />
                <button 
                  type="submit"
                  disabled={!lotId.trim()}
                  className="w-12 h-12 rounded-full bg-[var(--color-gold)] flex items-center justify-center text-[var(--color-forest)] hover:bg-[#d4b675] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>
          
          <div className="mt-8">
            <p className="text-[11px] tracking-[0.1em] uppercase text-[rgba(246,241,233,0.4)]">
              Don't have a Lot ID? <br className="md:hidden" />
              <a href="/trace/RWA-2024-AA-001" className="text-[var(--color-gold)] hover:underline ml-1">View a sample lot</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
