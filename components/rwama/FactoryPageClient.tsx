'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AnimatedStat } from '@/components/rwama/AnimatedStat'
import { LuxuryButton } from '@/components/rwama/LuxuryButton'
import { GlassContainer } from '@/components/rwama/GlassContainer'

interface FactoryData {
  name: string; est: number; altitude: number; farmers: number; capacity: number;
  location: string; coordinates: string; certs: string[]; tagline: string;
  description: string; heroImage: string; accentColor: string;
  stats: { label: string; value: number; suffix: string }[];
  process: { title: string; body: string }[];
}

const springTransition = { type: 'spring', stiffness: 50, damping: 20 }

export function FactoryPageClient({ factory }: { factory: FactoryData }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <article className="min-h-screen bg-[var(--color-cream)]">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-[90vh] min-h-[600px] flex items-end overflow-hidden"
      >
        <motion.div className="absolute inset-0" style={{ y: imgY }}>
          <div
            className="w-full h-full bg-[var(--color-forest)] bg-cover bg-center scale-110"
            style={{ backgroundImage: `url(${factory.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,53,36,0.92)] via-[rgba(18,53,36,0.4)] to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-[1320px] mx-auto px-6 pb-16 w-full">
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="overline text-[var(--color-gold)] mb-4"
          >
            Kirinyaga, Kenya · Est. {factory.est}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, ...springTransition }}
            className="text-[clamp(48px,6vw,90px)] text-[var(--color-cream)] mb-3 max-w-[700px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {factory.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-[18px] text-[rgba(246,241,233,0.65)] mb-10 italic"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {factory.tagline}
          </motion.p>

          <GlassContainer
            variant="dark"
            padding="none"
            delay={0.9}
            className="!rounded-[22px] inline-flex overflow-hidden"
          >
            {factory.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-8 py-5 ${i < factory.stats.length - 1 ? 'border-r border-[rgba(255,255,255,0.08)]' : ''}`}
              >
                <AnimatedStat
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  size="sm"
                  delay={i * 100}
                  valueColor="var(--color-gold)"
                  labelColor="rgba(246,241,233,0.55)"
                />
              </div>
            ))}
          </GlassContainer>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1320px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={springTransition}
            className="lg:col-span-7"
          >
            <p className="overline text-[var(--color-gold)] mb-5">About the Factory</p>
            <h2
              className="text-[clamp(28px,3vw,44px)] text-[var(--color-forest)] mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {factory.altitude}m altitude.<br /><em>Uncompromised quality.</em>
            </h2>
            <p className="text-[15px] text-[rgba(18,53,36,0.68)] leading-[1.9] max-w-[560px] mb-8">
              {factory.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {factory.certs.map((cert) => (
                <span
                  key={cert}
                  className="text-[11px] tracking-[0.04em] border border-[rgba(18,53,36,0.18)] text-[rgba(18,53,36,0.65)] rounded-[999px] px-4 py-1.5"
                >
                  {cert}
                </span>
              ))}
            </div>
            <LuxuryButton href="/marketplace" variant="ghost">
              View Lots from {factory.name} →
            </LuxuryButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ ...springTransition, delay: 0.12 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {[
              { label: 'Location',     value: `${factory.location}, Kirinyaga County` },
              { label: 'Coordinates',  value: factory.coordinates },
              { label: 'Altitude',     value: `${factory.altitude.toLocaleString()}m ASL` },
              { label: 'Capacity',     value: `${factory.capacity} MT per season` },
              { label: 'Active Since', value: factory.est.toString() },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center border-b border-[rgba(18,53,36,0.08)] pb-3">
                <span className="text-[11px] tracking-[0.07em] uppercase text-[rgba(18,53,36,0.45)]">
                  {row.label}
                </span>
                <span className="text-[14px] text-[var(--color-forest)] font-[500]">
                  {row.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROCESSING TIMELINE ──────────────────────────────────── */}
      <section className="bg-[var(--color-forest)] py-20 md:py-28">
        <div className="max-w-[1320px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={springTransition}
            className="mb-14"
          >
            <p className="overline text-[var(--color-gold)] mb-3">How We Process</p>
            <h2
              className="text-[clamp(28px,3vw,48px)] text-[var(--color-cream)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              The Wet Process
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {factory.process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...springTransition, delay: i * 0.1 }}
                className="glass rounded-[22px] p-7"
              >
                <div
                  className="text-[13px] tracking-[0.08em] font-[500] mb-5"
                  style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}
                >
                  Step {String(i + 1).padStart(2, '0')}
                </div>
                <h3
                  className="text-[20px] text-[var(--color-cream)] mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {step.title}
                </h3>
                <p className="text-[13px] text-[rgba(246,241,233,0.58)] leading-[1.8]">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
