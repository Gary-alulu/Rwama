'use client'

import { motion } from 'framer-motion'
import { LuxuryButton } from './LuxuryButton'

export function CTASection() {
  return (
    <section className="relative py-32 md:py-48 bg-[var(--color-forest)] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-[rgba(200,169,107,0.08)] via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[rgba(200,169,107,0.1)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[rgba(200,169,107,0.08)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[rgba(200,169,107,0.05)]" />
      </div>

      <div className="relative max-w-[1000px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span 
            className="inline-block text-[11px] tracking-[0.25em] uppercase text-[var(--color-gold)] font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Join the Cooperative
          </motion.span>
          
          <h2 
            className="text-[clamp(36px,6vw,72px)] text-[var(--color-cream)] leading-[1.1] mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to taste the
            <span className="block italic text-[var(--color-gold)]">difference?</span>
          </h2>
          
          <p className="text-[17px] md:text-[18px] text-[rgba(246,241,233,0.7)] max-w-[600px] mx-auto leading-relaxed mb-12">
            Whether you&apos;re a roaster seeking exceptional single-origin coffee or a coffee lover wanting to connect directly with farmers, we invite you to explore Rwama.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <LuxuryButton href="/marketplace" variant="gold" size="lg">
              Browse Live Lots
            </LuxuryButton>
            <LuxuryButton href="/contact" variant="outline" size="lg" className="w-full sm:w-auto">
              Get in Touch
            </LuxuryButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
