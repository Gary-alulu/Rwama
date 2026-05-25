'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'forest' | 'gold' | 'outline' | 'ghost' | 'cream'
type Size    = 'xs' | 'sm' | 'md' | 'lg'

interface LuxuryButtonProps {
  variant?:   Variant
  size?:      Size
  href?:      string
  external?:  boolean
  disabled?:  boolean
  loading?:   boolean
  className?: string
  children:   React.ReactNode
  onClick?:   () => void
  type?:      'button' | 'submit' | 'reset'
}

const BASE = `
  inline-flex items-center justify-center gap-2
  font-[var(--font-body)] font-[500] tracking-[0.04em]
  rounded-[999px] cursor-pointer
  transition-all duration-[350ms] ease-[var(--ease-luxury)]
  select-none whitespace-nowrap
  disabled:opacity-50 disabled:pointer-events-none
`

const VARIANTS: Record<Variant, string> = {
  forest: `
    bg-[var(--color-forest)] text-[var(--color-cream)]
    border border-transparent
    hover:bg-[#1a4f35]
    hover:shadow-[0_8px_24px_rgba(18,53,36,0.35)]
  `,
  gold: `
    bg-[var(--color-gold)] text-[#1a0f00]
    border border-transparent
    hover:bg-[#d4b675]
    hover:shadow-[0_8px_24px_rgba(200,169,107,0.45)]
  `,
  outline: `
    bg-transparent text-[var(--color-cream)]
    border border-[rgba(255,255,255,0.30)]
    hover:border-[var(--color-gold)]
    hover:text-[var(--color-gold)]
    hover:shadow-[0_0_20px_rgba(200,169,107,0.20)]
  `,
  ghost: `
    bg-transparent text-[var(--color-forest)]
    border border-[rgba(18,53,36,0.20)]
    hover:border-[var(--color-gold)]
    hover:text-[var(--color-coffee)]
    hover:bg-[var(--color-gold-20)]
  `,
  cream: `
    bg-[var(--color-cream)] text-[var(--color-forest)]
    border border-transparent
    hover:bg-white
    hover:shadow-[0_8px_24px_rgba(18,53,36,0.15)]
  `,
}

const SIZES: Record<Size, string> = {
  xs: 'text-[11px] px-4 py-[6px]',
  sm: 'text-[12px] px-5 py-[8px]',
  md: 'text-[13px] px-7 py-[11px]',
  lg: 'text-[15px] px-9 py-[14px]',
}

const MotionLink   = motion(Link)
const MotionButton = motion.button

export const LuxuryButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, LuxuryButtonProps>(
  (
    {
      variant  = 'forest',
      size     = 'md',
      href,
      external = false,
      disabled = false,
      loading  = false,
      className,
      children,
      onClick,
      type     = 'button',
    },
    ref
  ) => {
    const classes = cn(BASE, VARIANTS[variant], SIZES[size], className)

    const motionProps = {
      whileHover: { scale: disabled ? 1 : 1.02, y: disabled ? 0 : -1 },
      whileTap:   { scale: disabled ? 1 : 0.97 },
      transition: { type: 'spring', stiffness: 400, damping: 25 },
    }

    const content = (
      <>
        {loading ? (
          <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : null}
        {children}
      </>
    )

    if (href) {
      return (
        <MotionLink
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={classes}
          {...motionProps}
        >
          {content}
        </MotionLink>
      )
    }

    return (
      <MotionButton
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={classes}
        {...motionProps}
      >
        {content}
      </MotionButton>
    )
  }
)

LuxuryButton.displayName = 'LuxuryButton'
