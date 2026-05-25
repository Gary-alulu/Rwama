"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mountain, Users, Droplets, MapPin, Map } from "lucide-react";
import { LuxuryButton } from "@/components/rwama/LuxuryButton";
import { useRouter } from "next/navigation";

// ============================================================================
// MOCK DATA
// ============================================================================

const FACTORIES = [
  {
    id: "muthigi-ini",
    name: "Muthigi-ini",
    established: 1968,
    altitude: "1,680m",
    farmers: 430,
    specialty: "Peaberry",
    description: "Our founding factory, known for producing some of the highest-rated Peaberry lots in the region through meticulous sorting.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800"
  },
  {
    id: "kimatu",
    name: "Kimatu",
    established: 1974,
    altitude: "1,720m",
    farmers: 390,
    specialty: "Classic AB",
    description: "Situated in the misty higher elevations, Kimatu produces a deeply complex cup with vibrant acidity and rich berry notes.",
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=800"
  },
  {
    id: "muburi",
    name: "Muburi",
    established: 1979,
    altitude: "1,750m",
    farmers: 380,
    specialty: "Premium AA",
    description: "The highest of our stations, yielding dense, slow-matured beans that consistently score above 88 on the SCA scale.",
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=800"
  }
];

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function FactoriesIndexPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative pt-48 pb-32 px-6 lg:px-8 overflow-hidden bg-[var(--color-forest)]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14] via-transparent to-[var(--color-forest)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-[rgba(200,169,107,0.08)] to-transparent rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 40, damping: 20 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(200,169,107,0.3)] bg-[rgba(200,169,107,0.05)] backdrop-blur-md text-[var(--color-gold)] text-[10px] tracking-[0.25em] uppercase mb-10">
              <Map className="w-3 h-3" /> Our Heritage
            </span>
            <h1 className="text-[clamp(48px,7vw,96px)] leading-[1.05] text-[var(--color-cream)] mb-8" style={{ fontFamily: "var(--font-heading)" }}>
              The Heart of <br/>
              <span className="italic text-[var(--color-gold)]">Kirinyaga</span>
            </h1>
            <p className="text-lg md:text-xl text-[rgba(246,241,233,0.6)] max-w-[600px] mx-auto font-light tracking-wide">
              Three historic washing stations. One unified commitment to excellence. Discover the origins of Rwama's specialty coffee.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. FACTORIES GRID SECTION */}
      <section className="py-32 px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="space-y-24">
          {FACTORIES.map((factory, i) => (
            <motion.div 
              key={factory.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring", stiffness: 50, damping: 20 }}
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center group cursor-pointer`}
              onClick={() => router.push(`/factories/${factory.id}`)}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(18,53,36,0.12)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,53,36,0.6)] to-transparent z-10" />
                  <img 
                    src={factory.image} 
                    alt={factory.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-[rgba(255,255,255,0.95)] backdrop-blur-md rounded-full border border-[rgba(18,53,36,0.05)]">
                    <span className="text-[10px] uppercase tracking-widest text-[var(--color-forest)] font-medium">Est. {factory.established}</span>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="mb-6">
                  <h2 className="text-[clamp(40px,5vw,56px)] text-[var(--color-forest)] leading-none mb-4 group-hover:text-[var(--color-coffee)] transition-colors duration-500" style={{ fontFamily: "var(--font-heading)" }}>
                    {factory.name}
                  </h2>
                  <p className="text-lg text-[rgba(18,53,36,0.7)] leading-relaxed max-w-[500px]">
                    {factory.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-10 py-6 border-y border-[rgba(18,53,36,0.1)]">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Mountain className="w-4 h-4 text-[var(--color-gold)]" />
                      <span className="text-sm font-medium text-[var(--color-forest)]">{factory.altitude}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[rgba(18,53,36,0.5)]">Elevation</span>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-[var(--color-gold)]" />
                      <span className="text-sm font-medium text-[var(--color-forest)]">{factory.farmers}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[rgba(18,53,36,0.5)]">Contributors</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="w-4 h-4 text-[var(--color-gold)]" />
                      <span className="text-sm font-medium text-[var(--color-forest)]">Fully Washed</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[rgba(18,53,36,0.5)]">Processing</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-[var(--color-gold)]" />
                      <span className="text-sm font-medium text-[var(--color-forest)]">{factory.specialty}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[rgba(18,53,36,0.5)]">Specialty</span>
                  </div>
                </div>

                <div>
                  <LuxuryButton variant="forest" size="lg">
                    Explore {factory.name} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </LuxuryButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. CTA SECTION */}
      <section className="relative py-32 bg-[var(--color-forest)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d261a] via-[#123524] to-[#1a4a32]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-[rgba(200,169,107,0.15)] to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-[900px] mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)] font-medium mb-6 block">
              Direct Trade
            </span>
            <h2
              className="text-[clamp(36px,5vw,56px)] leading-[1.05] text-[var(--color-cream)] mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Taste the difference of
              <span className="italic text-[var(--color-gold)]">
                {" "}
                True Traceability
              </span>
            </h2>
            <div className="flex justify-center mt-10">
              <LuxuryButton href="/marketplace" variant="gold" size="lg">
                View Available Lots
                <ArrowRight className="w-5 h-5 ml-2" />
              </LuxuryButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
