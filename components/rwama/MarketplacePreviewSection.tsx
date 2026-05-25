'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, MapPin, Mountain, Award } from 'lucide-react'
import { LuxuryButton } from './LuxuryButton'

interface Lot {
  id: string
  name: string
  factory: string
  grade: string
  altitude: string
  process: string
  harvest: string
  cuppingNotes: string[]
  score: number
  available: number
  price: number
}

interface MarketplacePreviewSectionProps {
  lots: Lot[]
}

export function MarketplacePreviewSection({ lots }: MarketplacePreviewSectionProps) {
  return (
    <section className="relative py-32 md:py-48 bg-[var(--color-cream)] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] rounded-full bg-gradient-radial from-[var(--color-gold-20)] to-transparent opacity-40 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-[var(--color-forest-10)] to-transparent opacity-50 translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20 md:mb-28"
        >
          <motion.span 
            className="inline-block text-[11px] tracking-[0.25em] uppercase text-[var(--color-gold)] font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Live Auction
          </motion.span>
          <h2 
            className="text-[clamp(36px,5vw,64px)] text-[var(--color-forest)] leading-[1.1] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Current Offerings
          </h2>
          <p className="text-[17px] text-[rgba(18,53,36,0.7)] max-w-[580px] mx-auto leading-relaxed">
            Direct trade lots from our three washing stations. Fully traceable, cupped, and ready for export.
          </p>
        </motion.div>

        {/* Lot Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lots.map((lot, index) => (
            <motion.div
              key={lot.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              <Link href={`/marketplace/${lot.id}`}>
                <motion.div
                  className="group relative bg-white rounded-[28px] overflow-hidden border border-[rgba(18,53,36,0.08)]
                           shadow-[0_2px_12px_rgba(0,0,0,0.05)]
                           hover:shadow-[0_20px_60px_rgba(18,53,36,0.15)] transition-all duration-700"
                  whileHover={{ y: -8 }}
                >
                  {/* Image Container */}
                  <div className="relative h-[240px] overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-[var(--color-forest)] to-[#1a4a32] transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `radial-gradient(circle at 30% 30%, rgba(200, 169, 107, 0.15) 0%, transparent 50%)`,
                      }}
                    />
                    
                    {/* Grade badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-[var(--color-gold)] rounded-full">
                      <span className="text-[11px] tracking-[0.1em] uppercase text-[var(--color-forest)] font-semibold">
                        Grade {lot.grade}
                      </span>
                    </div>

                    {/* Score badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm rounded-full border border-[rgba(255,255,255,0.1)]">
                      <Award className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                      <span className="text-[12px] text-[var(--color-cream)] font-medium">
                        {lot.score}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                    
                    {/* Arrow on hover */}
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    >
                      <div className="w-16 h-16 rounded-full bg-[var(--color-gold)] flex items-center justify-center">
                        <ArrowUpRight className="w-6 h-6 text-[var(--color-forest)]" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[12px] text-[rgba(18,53,36,0.5)] mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="uppercase tracking-[0.1em]">{lot.factory}</span>
                    </div>
                    
                    <h3 
                      className="text-[22px] text-[var(--color-forest)] mb-3 group-hover:text-[var(--color-gold)] transition-colors duration-500"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {lot.name}
                    </h3>

                    {/* Cupping notes */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {lot.cuppingNotes.slice(0, 3).map((note) => (
                        <span 
                          key={note}
                          className="text-[11px] px-2.5 py-1 bg-[rgba(18,53,36,0.06)] text-[rgba(18,53,36,0.7)] rounded-full"
                        >
                          {note}
                        </span>
                      ))}
                    </div>

                    {/* Footer info */}
                    <div className="flex items-center justify-between pt-4 border-t border-[rgba(18,53,36,0.08)]">
                      <div className="flex items-center gap-1.5 text-[12px] text-[rgba(18,53,36,0.6)]">
                        <Mountain className="w-3.5 h-3.5" />
                        <span>{lot.altitude}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[11px] text-[rgba(18,53,36,0.5)]">{lot.available} bags</span>
                        <span className="text-[14px] font-medium text-[var(--color-forest)]">${lot.price}/kg</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-20 md:mt-28"
        >
          <p className="text-[16px] text-[rgba(246,241,233,0.6)] mb-6">
            View all available lots and place your bid
          </p>
          <Link 
            href="/marketplace"
            className="inline-flex items-center gap-2 text-[var(--color-gold)] hover:text-[var(--color-cream)] transition-colors duration-300"
          >
            <span className="text-[14px] tracking-[0.1em] uppercase font-medium">Visit Marketplace</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
