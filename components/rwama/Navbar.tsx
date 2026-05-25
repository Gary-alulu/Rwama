'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { LuxuryButton } from './LuxuryButton'

const NAV_LINKS = [
  { label: 'Our Factories',  href: '/factories'   },
  { label: 'Marketplace',    href: '/marketplace'  },
  { label: 'Our Story',      href: '/story'        },
  { label: 'Traceability',   href: '/traceability' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.1 }}
        className={`
          fixed top-0 left-0 right-0 z-[100]
          transition-all duration-500 ease-[var(--ease-luxury)]
          ${scrolled
            ? 'bg-[var(--color-forest-60)] backdrop-blur-[12px] border-b border-[var(--color-white-10)] py-3'
            : 'bg-transparent py-5'
          }
        `}
      >
        <div className="max-w-[1320px] mx-auto px-6 flex items-center justify-between">

          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-3 group">
            <span
              className="text-[28px] tracking-[-0.02em] leading-none"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-cream)' }}
            >
              Rwama
            </span>
            <span
              className="text-[10px] tracking-[0.18em] uppercase opacity-60 mt-1"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gold)' }}
            >
              Coffee
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  text-[13px] tracking-[0.04em] transition-colors duration-200
                  ${pathname.startsWith(link.href)
                    ? 'text-[var(--color-gold)]'
                    : 'text-[rgba(246,241,233,0.75)] hover:text-[var(--color-cream)]'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LuxuryButton href="/marketplace" size="sm" variant="gold">
                View Lots
              </LuxuryButton>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col gap-[5px] p-2"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block w-5 h-[1.5px] bg-[var(--color-cream)] origin-center"
                  animate={
                    menuOpen
                      ? i === 0 ? { rotate: 45, y: 6.5 }
                      : i === 1 ? { opacity: 0, scaleX: 0 }
                      : { rotate: -45, y: -6.5 }
                      : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                  }
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            className="fixed inset-y-0 right-0 w-[280px] z-[90]
                       bg-[var(--color-forest)] flex flex-col pt-24 px-8 pb-10"
          >
            <nav className="flex flex-col gap-6 mb-auto">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className="block text-[22px] text-[var(--color-cream)] hover:text-[var(--color-gold)] transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <LuxuryButton href="/marketplace" variant="gold" className="w-full justify-center">
              View Lots
            </LuxuryButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrim */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-[80] bg-black/50 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
