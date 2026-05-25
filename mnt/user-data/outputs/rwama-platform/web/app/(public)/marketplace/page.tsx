'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassContainer } from '@/components/rwama/GlassContainer'
import { LuxuryButton   } from '@/components/rwama/LuxuryButton'
import { FlavorRadar    } from '@/components/rwama/FlavorRadar'

type Grade = 'AA' | 'AB' | 'PB' | 'ALL'

const LOTS = [
  {
    id:            'RW-MUT-2026-AA-001',
    grade:         'AA' as const,
    factory:       'Muthigi-ini',
    factorySlug:   'muthigi-ini',
    scaScore:      87.5,
    moisture:      11.2,
    weightKg:      2880,
    bags:          48,
    priceUsd:      8.40,
    processingMethod: 'Fully Washed',
    cropYear:      2026,
    flavorTags:    ['Blackcurrant', 'Citrus Zest', 'Dark Chocolate', 'Jasmine', 'Brown Sugar'],
    available:     true,
    radarData: {
      Acidity: 9.0, Body: 7.5, Sweetness: 8.0,
      Aroma: 9.5, Aftertaste: 8.5, Balance: 8.5,
    },
  },
  {
    id:            'RW-KIM-2026-AB-042',
    grade:         'AB' as const,
    factory:       'Kimatu',
    factorySlug:   'kimatu',
    scaScore:      85.0,
    moisture:      11.8,
    weightKg:      3720,
    bags:          62,
    priceUsd:      6.80,
    processingMethod: 'Fully Washed',
    cropYear:      2026,
    flavorTags:    ['Stone Fruit', 'Caramel', 'Honey', 'Bergamot', 'Cedar'],
    available:     true,
    radarData: {
      Acidity: 7.5, Body: 9.0, Sweetness: 8.5,
      Aroma: 8.0, Aftertaste: 8.0, Balance: 8.5,
    },
  },
  {
    id:            'RW-MUB-2026-PB-018',
    grade:         'PB' as const,
    factory:       'Muburi',
    factorySlug:   'muburi',
    scaScore:      83.5,
    moisture:      12.1,
    weightKg:      2100,
    bags:          35,
    priceUsd:      9.20,
    processingMethod: 'Fully Washed',
    cropYear:      2026,
    flavorTags:    ['Red Berry', 'Toffee', 'Nutmeg', 'Vanilla', 'Dried Rose'],
    available:     true,
    radarData: {
      Acidity: 8.0, Body: 8.0, Sweetness: 9.5,
      Aroma: 8.5, Aftertaste: 9.0, Balance: 9.0,
    },
  },
]

const GRADE_COLOR: Record<string, string> = {
  AA: 'var(--color-forest)',
  AB: 'var(--color-coffee)',
  PB: 'var(--color-gold)',
}

const GRADE_TEXT: Record<string, string> = {
  AA: 'var(--color-cream)',
  AB: 'var(--color-cream)',
  PB: '#1a0f00',
}

export default function MarketplacePage() {
  const [activeGrade, setActiveGrade] = useState<Grade>('ALL')
  const [selectedLot, setSelectedLot] = useState<typeof LOTS[0] | null>(null)

  const filtered = useMemo(
    () => activeGrade === 'ALL' ? LOTS : LOTS.filter(l => l.grade === activeGrade),
    [activeGrade]
  )

  return (
    <div className="min-h-screen bg-[var(--color-cream)] pt-24">

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="bg-[var(--color-forest)] pt-14 pb-20">
        <div className="max-w-[1320px] mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="overline text-[var(--color-gold)] mb-4"
          >
            Live Lot Exchange · {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, type: 'spring', stiffness: 50, damping: 20 }}
            className="text-[clamp(36px,5vw,64px)] text-[var(--color-cream)] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Rwama Marketplace
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[14px] text-[rgba(246,241,233,0.60)] max-w-[500px]"
          >
            {LOTS.length} lots currently available from three factories.
            All prices FOB Mombasa. Sensory profiles available on request.
          </motion.p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 -mt-10 pb-24">

        {/* ── FILTER BAR ─────────────────────────────────────────── */}
        <GlassContainer variant="dark" padding="sm" className="!rounded-[999px] inline-flex items-center gap-2 mb-10">
          {(['ALL', 'AA', 'AB', 'PB'] as Grade[]).map((g) => (
            <motion.button
              key={g}
              onClick={() => setActiveGrade(g)}
              whileTap={{ scale: 0.95 }}
              className={`
                px-6 py-2 rounded-[999px] text-[12px] font-[500] tracking-[0.05em]
                transition-all duration-300
                ${activeGrade === g
                  ? 'bg-[var(--color-gold)] text-[#1a0f00] shadow-[0_4px_16px_rgba(200,169,107,0.35)]'
                  : 'text-[rgba(246,241,233,0.70)] hover:text-[var(--color-cream)]'
                }
              `}
            >
              {g === 'ALL' ? 'All Grades' : `Grade ${g}`}
            </motion.button>
          ))}
        </GlassContainer>

        {/* ── LOT GRID ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((lot, i) => (
              <motion.div
                key={lot.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{    opacity: 0, scale: 0.96, y: -8 }}
                transition={{ type: 'spring', stiffness: 50, damping: 20, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="bg-white border border-[rgba(18,53,36,0.08)] rounded-[24px]
                           shadow-[0_2px_12px_rgba(0,0,0,0.05)]
                           hover:shadow-[0_16px_48px_rgba(18,53,36,0.12)]
                           transition-shadow duration-500 cursor-pointer overflow-hidden"
                onClick={() => setSelectedLot(selectedLot?.id === lot.id ? null : lot)}
              >
                {/* Card header */}
                <div className="p-7 pb-5">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <span
                        className="inline-block rounded-[999px] text-[10px] font-[500] tracking-[0.08em] uppercase px-3 py-1 mb-3"
                        style={{ background: GRADE_COLOR[lot.grade], color: GRADE_TEXT[lot.grade] }}
                      >
                        Grade {lot.grade}
                      </span>
                      <div
                        className="text-[20px] text-[var(--color-forest)]"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {lot.factory} Lot
                      </div>
                      <div className="trace-id mt-1">{lot.id}</div>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-[32px] leading-none"
                        style={{ fontFamily: 'var(--font-heading)', color: GRADE_COLOR[lot.grade] }}
                      >
                        {lot.scaScore.toFixed(1)}
                      </div>
                      <div className="text-[10px] tracking-[0.07em] uppercase text-[rgba(18,53,36,0.45)] mt-1">
                        SCA Score
                      </div>
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[rgba(18,53,36,0.55)] mb-5">
                    <span>{lot.moisture}% moisture</span>
                    <span className="opacity-30">·</span>
                    <span>{lot.processingMethod}</span>
                    <span className="opacity-30">·</span>
                    <span>{lot.bags} bags ({lot.weightKg.toLocaleString()} kg)</span>
                  </div>

                  {/* Flavor tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {lot.flavorTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-[rgba(18,53,36,0.06)] text-[rgba(18,53,36,0.65)] rounded-[999px] px-2.5 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-[rgba(18,53,36,0.06)] px-7 py-4 flex items-center justify-between">
                  <div>
                    <div className="text-[18px] font-[500] text-[var(--color-forest)]" style={{ fontFamily: 'var(--font-heading)' }}>
                      USD {lot.priceUsd.toFixed(2)}/kg
                    </div>
                    <div className="text-[10px] text-[rgba(18,53,36,0.45)] tracking-[0.04em]">
                      FOB Mombasa
                    </div>
                  </div>
                  <LuxuryButton
                    href={`/marketplace/${lot.id}`}
                    variant="ghost"
                    size="sm"
                    onClick={(e: any) => e.stopPropagation()}
                  >
                    Request Sample
                  </LuxuryButton>
                </div>

                {/* Expandable radar */}
                <AnimatePresence>
                  {selectedLot?.id === lot.id && (
                    <motion.div
                      key="radar"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                      className="overflow-hidden border-t border-[rgba(18,53,36,0.06)]"
                    >
                      <div className="p-7 pt-5">
                        <p className="overline text-[rgba(18,53,36,0.45)] text-[9px] mb-4">
                          Sensory Profile
                        </p>
                        <FlavorRadar
                          datasets={[{
                            label: `${lot.grade} · ${lot.factory}`,
                            color: GRADE_COLOR[lot.grade],
                            data:  lot.radarData,
                          }]}
                          height={220}
                          showLegend={false}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── TRACEABILITY EXPLAINER ─────────────────────────────── */}
        <div className="bg-[var(--color-forest)] rounded-[28px] p-10 md:p-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="overline text-[var(--color-gold)] mb-4">Full Transparency</p>
              <h2
                className="text-[clamp(28px,3vw,44px)] text-[var(--color-cream)] mb-5"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Every ID tells a complete story.
              </h2>
              <p className="text-[14px] text-[rgba(246,241,233,0.60)] leading-[1.85]">
                Our Traceability IDs encode factory, crop year, grade, and lot number.
                Scan any ID to access the full chain — from the farmer's delivery log
                to the processing batch, drying record, and final sensory score.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {['RW', 'MUT', '2026', 'AA', '001'].map((segment, i) => {
                const LABELS = ['Cooperative', 'Factory Code', 'Crop Year', 'Grade', 'Lot Number']
                return (
                  <motion.div
                    key={segment}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, type: 'spring', stiffness: 50, damping: 20 }}
                    className="flex items-center gap-4"
                  >
                    <span
                      className="w-16 text-center text-[15px] font-[500] text-[var(--color-gold)] bg-[rgba(200,169,107,0.15)] rounded-[8px] py-1"
                      style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}
                    >
                      {segment}
                    </span>
                    <span className="text-[13px] text-[rgba(246,241,233,0.55)]">
                      {LABELS[i]}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
