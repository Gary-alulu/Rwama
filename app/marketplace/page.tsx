"use client";

import { LuxuryButton } from "@/components/rwama/LuxuryButton";
import MarketplaceView from "@/components/rwama/MarketplaceView";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Loader2, Star } from "lucide-react";
import { Suspense, useRef } from "react";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function MarketplacePage() {
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
        className="relative min-h-[85vh] overflow-hidden bg-[var(--color-forest)] flex flex-col justify-center"
      >
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d261a]/90 via-[#123524] to-[#1a4a32]/90" />
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-[rgba(200,169,107,0.15)] to-transparent rounded-full blur-3xl" />

          {/* Floating Particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[var(--color-gold)] rounded-full"
              style={{
                left: `${10 + i * 8}%`,
                top: `${20 + (i % 4) * 20}%`,
                opacity: 0.15 + Math.random() * 0.3,
              }}
              animate={{
                y: [0, -40 - Math.random() * 60, 0],
                opacity: [0.15, 0.5, 0.15],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 4,
              }}
            />
          ))}
        </motion.div>

        <motion.div
          className="relative z-10 flex flex-col justify-center pt-32 px-6 lg:px-8 max-w-[1400px] mx-auto w-full"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-[800px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 40 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(200,169,107,0.3)] bg-[rgba(200,169,107,0.05)] backdrop-blur-md text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase mb-8 shadow-lg">
                <Star className="w-3.5 h-3.5" /> Live Coffee Exchange
              </span>
              <h1
                className="text-[clamp(48px,7vw,90px)] leading-[1.05] text-[var(--color-cream)] mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Discover Traceable <br />
                <span className="italic text-[var(--color-gold)]">
                  Kenyan Specialty Coffee.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[rgba(246,241,233,0.7)] max-w-[600px] mb-12 font-light tracking-wide leading-relaxed">
                Premium single-origin lots curated by 1,200 farmers in Kirinyaga
                County. Fully traceable from farm to cup.
              </p>

              <div className="flex flex-wrap gap-6">
                <LuxuryButton
                  variant="gold"
                  size="lg"
                  onClick={() => {
                    document
                      .getElementById("explore-lots")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Explore Live Lots <ArrowRight className="w-5 h-5 ml-2" />
                </LuxuryButton>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* MARKETPLACE VIEW COMPONENT WITH TANSTACK QUERY */}
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-32 bg-[var(--color-cream)]">
            <Loader2 className="w-8 h-8 text-[var(--color-gold)] animate-spin mb-4" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-forest)]">
              Loading Marketplace...
            </span>
          </div>
        }
      >
        <MarketplaceView />
      </Suspense>
    </div>
  );
}
