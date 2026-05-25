"use client";

import { LuxuryButton } from "@/components/rwama/LuxuryButton";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    ArrowRight,
    ArrowUpRight,
    Coffee,
    Mountain,
    Users
} from "lucide-react";
import { useRef } from "react";

const FACTORY = {
  name: "Muthigi-ini",
  slug: "muthigi-ini",
  tagline: "Crafting high-altitude Kenyan coffee since 1968",
  established: 1968,
  altitude: "1,680m",
  farmers: 430,
  capacity: "350 MT",
  location: "Kirinyaga County, Kenya",
  quality: {
    grade: "AA/AB",
    cupping: 87.5,
    acidity: "Bright, Citrus-forward",
    body: "Medium-Full, Silky",
    sweetness: "High, Caramel notes",
    flavor_notes: [
      "Blackcurrant",
      "Lemon Zest",
      "Dark Chocolate",
      "Caramel",
      "Stone Fruit",
    ],
  },
  climate: {
    rainfall: "1,400mm annually",
    temperature: "16-22°C average",
    humidity: "65-75%",
    soil: "Red volcanic loam, rich in phosphorus",
  },
  lots: [
    {
      id: "RWA-2024-AA-001",
      name: "Lot 45 - Peaberry Reserve",
      process: "Fully Washed",
      grade: "AA",
      available: "45 bags",
      price: "$8.40/kg",
      flavor_notes: ["Grapefruit", "Brown Spice", "Honey"],
    },
    {
      id: "RWA-2024-AB-012",
      name: "Lot 67 - Classic AB",
      process: "Fully Washed",
      grade: "AB",
      available: "120 bags",
      price: "$6.80/kg",
      flavor_notes: ["Blackcurrant", "Caramel", "Orange"],
    },
    {
      id: "RWA-2024-AA-023",
      name: "Lot 89 - Top AA",
      process: "Fully Washed",
      grade: "AA",
      available: "85 bags",
      price: "$7.90/kg",
      flavor_notes: ["Lemon Zest", "Dark Chocolate", "Berry"],
    },
  ],
};

export default function FactoryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden bg-[var(--color-forest)]"
      >
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d261a] via-[#123524] to-[#1a4a32]" />
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-[rgba(200,169,107,0.1)] to-transparent rounded-full blur-3xl" />
        </motion.div>

        <motion.div
          className="relative z-10 min-h-screen flex flex-col justify-center"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-16 h-[1px] bg-[var(--color-gold)]" />
                  <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] font-medium">
                    Est. {FACTORY.established} · Kirinyaga
                  </span>
                </div>
                <h1
                  className="text-[clamp(42px,6vw,80px)] leading-[1.05] text-[var(--color-cream)] mb-8"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  <span className="block">{FACTORY.name}</span>
                  <span className="block italic text-[var(--color-gold)] mt-2">
                    Factory
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-[rgba(246,241,233,0.75)] max-w-[500px] mb-10 leading-relaxed">
                  {FACTORY.tagline}
                </p>
                <div className="flex flex-wrap gap-4">
                  <LuxuryButton href="#lots" variant="gold" size="lg">
                    <span>Explore Coffee Lots</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </LuxuryButton>
                  <LuxuryButton
                    href="#traceability"
                    variant="outline"
                    size="lg"
                  >
                    Trace Coffee Journey
                  </LuxuryButton>
                </div>
              </motion.div>

              <motion.div
                className="relative h-[500px] hidden lg:block"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.div
                  className="absolute top-0 right-0 w-[220px] p-6 rounded-[24px] bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0.05)] backdrop-blur-md border border-[rgba(255,255,255,0.15)]"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Mountain className="w-8 h-8 text-[var(--color-gold)] mb-4" />
                  <span
                    className="text-[36px] font-light text-[var(--color-cream)] block"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {FACTORY.altitude}
                  </span>
                  <span className="text-xs tracking-[0.15em] uppercase text-[rgba(246,241,233,0.6)]">
                    Altitude
                  </span>
                </motion.div>

                <motion.div
                  className="absolute top-[180px] right-[180px] w-[200px] p-6 rounded-[24px] bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.04)] backdrop-blur-md border border-[rgba(255,255,255,0.12)]"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <Users className="w-7 h-7 text-[var(--color-gold)] mb-3" />
                  <span
                    className="text-[32px] font-light text-[var(--color-cream)] block"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {FACTORY.farmers}
                  </span>
                  <span className="text-xs tracking-[0.15em] uppercase text-[rgba(246,241,233,0.6)]">
                    Farmers
                  </span>
                </motion.div>

                <motion.div
                  className="absolute top-[360px] right-[60px] w-[240px] p-6 rounded-[24px] bg-gradient-to-br from-[rgba(255,255,255,0.11)] to-[rgba(255,255,255,0.05)] backdrop-blur-md border border-[rgba(255,255,255,0.14)]"
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[rgba(200,169,107,0.2)] flex items-center justify-center">
                      <Coffee className="w-5 h-5 text-[var(--color-gold)]" />
                    </div>
                    <div>
                      <span
                        className="text-[28px] font-light text-[var(--color-cream)] block leading-none"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {FACTORY.capacity}
                      </span>
                      <span className="text-[10px] tracking-[0.12em] uppercase text-[rgba(246,241,233,0.5)]">
                        Annual Capacity
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-gradient-to-r from-[var(--color-gold)] to-[#d4b675] rounded-full" />
                    </div>
                    <span className="text-xs text-[var(--color-gold)]">
                      85%
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* COFFEE LOTS SECTION */}
      <section
        id="lots"
        className="relative py-32 lg:py-40 bg-[var(--color-cream)] overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-xs tracking-[0.25em] uppercase text-[var(--color-gold)] font-medium mb-4 block">
              Available Now
            </span>
            <h2
              className="text-[clamp(36px,4vw,56px)] leading-[1.1] text-[var(--color-forest)] mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Current{" "}
              <span className="italic text-[var(--color-coffee)]">
                Coffee Lots
              </span>
            </h2>
            <p className="text-lg text-[rgba(18,53,36,0.7)] max-w-[600px] mx-auto">
              Premium green coffee beans, fully traceable from our washing
              station to your roastery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FACTORY.lots.map((lot, index) => (
              <motion.div
                key={lot.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="group relative p-8 rounded-[28px] bg-white border border-[rgba(18,53,36,0.08)] shadow-[0_4px_20px_rgba(18,53,36,0.05)] hover:shadow-[0_16px_48px_rgba(18,53,36,0.12)] transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-[10px] tracking-[0.15em] uppercase text-[rgba(18,53,36,0.4)] font-mono">
                      {lot.id}
                    </span>
                    <h3
                      className="text-xl text-[var(--color-forest)] mt-1"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {lot.name}
                    </h3>
                  </div>
                  <div className="px-3 py-1.5 bg-[var(--color-forest)] rounded-full">
                    <span className="text-xs text-[var(--color-cream)] font-medium tracking-wider">
                      {lot.grade}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[rgba(18,53,36,0.5)]">Process</span>
                    <span className="text-[var(--color-forest)] font-medium">
                      {lot.process}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[rgba(18,53,36,0.5)]">Available</span>
                    <span className="text-[var(--color-forest)] font-medium">
                      {lot.available}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-[rgba(18,53,36,0.4)] block mb-2">
                    Flavor Notes
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {lot.flavor_notes.map((note) => (
                      <span
                        key={note}
                        className="px-3 py-1 bg-[rgba(200,169,107,0.1)] text-[var(--color-coffee)] text-xs rounded-full"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-[rgba(18,53,36,0.08)]">
                  <div>
                    <span
                      className="text-2xl font-light text-[var(--color-forest)]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {lot.price}
                    </span>
                    <span className="text-xs text-[rgba(18,53,36,0.4)] block">
                      FOB
                    </span>
                  </div>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-forest)] text-[var(--color-cream)] rounded-full text-sm font-medium hover:bg-[var(--color-coffee)] transition-colors">
                    Inquire <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-32 lg:py-48 bg-[var(--color-forest)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d261a] via-[#123524] to-[#1a4a32]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-[rgba(200,169,107,0.15)] to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-[1000px] mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs tracking-[0.25em] uppercase text-[var(--color-gold)] font-medium mb-6 block">
              Join the Rwama Family
            </span>
            <h2
              className="text-[clamp(40px,6vw,72px)] leading-[1.05] text-[var(--color-cream)] mb-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Experience the Future of{" "}
              <span className="italic text-[var(--color-gold)]">
                Kenyan Specialty Coffee
              </span>
            </h2>
            <p className="text-lg md:text-xl text-[rgba(246,241,233,0.7)] max-w-[600px] mx-auto mb-12 leading-relaxed">
              Connect directly with Muthigi-ini Factory and access fully
              traceable, premium Kenyan coffee for your roastery.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <LuxuryButton href="/contact" variant="gold" size="lg">
                <span>Contact Rwama</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </LuxuryButton>
              <LuxuryButton href="/marketplace" variant="outline" size="lg">
                Explore Marketplace
              </LuxuryButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
