"use client";

import { CoffeeJourneySection } from "@/components/rwama/CoffeeJourneySection";
import { CTASection } from "@/components/rwama/CTASection";
import { FactoryCardsSection } from "@/components/rwama/FactoryCardsSection";
import { SAMPLE_LOTS } from "@/components/rwama/FlavorRadar";
import { LuxuryButton } from "@/components/rwama/LuxuryButton";
import { MarketplacePreviewSection } from "@/components/rwama/MarketplacePreviewSection";
import { NewsSection } from "@/components/rwama/NewsSection";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

// Section reveal animation preset
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const sectionTransition = {
  type: "spring",
  stiffness: 50,
  damping: 20,
};

const FACTORIES = [
  {
    name: "Muthigi-ini",
    est: 1968,
    altitude: "1,680m",
    farmers: 430,
    capacity: "350 MT",
    slug: "muthigi-ini",
    image: "/images/factories/muthigiini.jpg",
  },
  {
    name: "Kimatu",
    est: 1974,
    altitude: "1,720m",
    farmers: 390,
    capacity: "310 MT",
    slug: "kimatu",
    image: "/images/factories/kimatu.jpg",
  },
  {
    name: "Muburi",
    est: 1979,
    altitude: "1,750m",
    farmers: 380,
    capacity: "290 MT",
    slug: "muburi",
    image: "/images/factories/muburi.jpg",
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden pt-32 md:pt-40"
      >
        {/* Video/Image background with parallax */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: videoY }}
        >
          {/* Fallback to gradient since video might not exist */}
          <div
            className="w-full h-full bg-cover bg-center scale-105"
            style={{
              backgroundImage: `linear-gradient(135deg, #123524 0%, #1a4a32 50%, #2d5a40 100%)`,
            }}
          />
          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)] via-[rgba(18,53,36,0.4)] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(18,53,36,0.6)] to-transparent" />
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-radial-vignette" />
        </motion.div>

        {/* Animated particles/elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[var(--color-gold)] rounded-full opacity-30"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Hero content - Two column layout */}
        <motion.div
          className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pb-32 md:pb-40"
          style={{ opacity: heroOpacity }}
        >
          {/* Two column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
            {/* LEFT COLUMN - Storytelling */}
            <div className="pt-8 lg:pt-16">
              {/* Overline with gold accent */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-12 h-[1px] bg-[var(--color-gold)]" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-gold)] font-medium">
                  Est. 1968 · Kirinyaga, Kenya
                </span>
              </motion.div>

              {/* Main headline with staggered animation */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[clamp(36px,5vw,72px)] leading-[1.08] tracking-[-0.02em] text-[var(--color-cream)] mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="block">Grown at 1,700m.</span>
                <span className="block italic text-[var(--color-gold)]">
                  Crafted by Nature.
                </span>
                <span className="block">Curated by 1,200 Farmers.</span>
              </motion.h1>

              {/* Subtitle with fade-in */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[16px] md:text-[17px] text-[rgba(246,241,233,0.8)] max-w-[480px] mb-8 leading-relaxed"
              >
                Experience single-origin specialty coffee from the volcanic
                slopes of Mount Kenya. Traceable from soil to cup.
              </motion.p>

              {/* CTA Buttons with stagger */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.0,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-wrap gap-4"
              >
                <LuxuryButton
                  href="/marketplace"
                  variant="gold"
                  size="lg"
                  className="group"
                >
                  <span>Explore Live Lots</span>
                  <motion.span
                    className="ml-2 inline-flex items-center"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </LuxuryButton>
                <LuxuryButton href="/story" variant="outline" size="lg">
                  Watch Our Story
                </LuxuryButton>
              </motion.div>
            </div>

            {/* RIGHT COLUMN - Stats */}
            <div className="hidden lg:flex flex-col justify-center h-full pt-24">
              {/* Floating Stats Cards */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 1.2,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="space-y-4"
              >
                {/* Card 1 - Farmers */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.6 }}
                  className="bg-[rgba(18,53,36,0.6)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-2xl p-5 ml-auto max-w-[220px]"
                >
                  <div
                    className="text-[32px] font-light text-[var(--color-gold)] leading-none mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    1,200+
                  </div>
                  <div className="text-[11px] tracking-[0.15em] uppercase text-[rgba(246,241,233,0.6)]">
                    Member Farmers
                  </div>
                </motion.div>

                {/* Card 2 - Altitude - offset to left */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="bg-[rgba(18,53,36,0.6)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-2xl p-5 max-w-[200px]"
                >
                  <div
                    className="text-[32px] font-light text-[var(--color-gold)] leading-none mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    1,700m
                  </div>
                  <div className="text-[11px] tracking-[0.15em] uppercase text-[rgba(246,241,233,0.6)]">
                    Altitude Grown
                  </div>
                </motion.div>

                {/* Card 3 - Washing Stations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7, duration: 0.6 }}
                  className="bg-[rgba(18,53,36,0.6)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-2xl p-5 ml-auto max-w-[200px]"
                >
                  <div
                    className="text-[32px] font-light text-[var(--color-gold)] leading-none mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    3
                  </div>
                  <div className="text-[11px] tracking-[0.15em] uppercase text-[rgba(246,241,233,0.6)]">
                    Washing Stations
                  </div>
                </motion.div>

                {/* Card 4 - Established - offset */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9, duration: 0.6 }}
                  className="bg-[rgba(18,53,36,0.6)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-2xl p-5 max-w-[180px]"
                >
                  <div
                    className="text-[32px] font-light text-[var(--color-gold)] leading-none mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    58
                  </div>
                  <div className="text-[11px] tracking-[0.15em] uppercase text-[rgba(246,241,233,0.6)]">
                    Years
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator with elegant animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-cream)] opacity-40 font-medium">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-gold)] to-transparent"
          />
        </motion.div>
      </section>

      {/* ── COFFEE JOURNEY SECTION ──────────────────────────────── */}
      <CoffeeJourneySection />

      {/* ── FACTORY CARDS SECTION ───────────────────────────────── */}
      <FactoryCardsSection factories={FACTORIES} />

      {/* ── MARKETPLACE PREVIEW SECTION ─────────────────────────── */}
      <MarketplacePreviewSection lots={SAMPLE_LOTS.slice(0, 3)} />

      {/* ── NEWS & INSIGHTS SECTION ────────────────────────────── */}
      <NewsSection />

      {/* ── CTA SECTION ───────────────────────────────────────── */}
      <CTASection />
    </>
  );
}
