'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'dark' | 'gold' | 'cream'

interface GlassContainerProps extends HTMLMotionProps<'div'> {
  variant?: Variant
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
  delay?: number
  className?: string
  children: React.ReactNode
}

const VARIANT_STYLES: Record<Variant, string> = {
  default: `
    bg-[rgba(246,241,233,0.08)]
    border border-[rgba(255,255,255,0.10)]
    backdrop-blur-[12px]
  `,
  dark: `
    bg-[rgba(18,53,36,0.65)]
    border border-[rgba(255,255,255,0.08)]
    backdrop-blur-[12px]
  `,
  gold: `
    bg-[rgba(200,169,107,0.12)]
    border border-[rgba(200,169,107,0.30)]
    backdrop-blur-[12px]
  `,
  cream: `
    bg-[rgba(246,241,233,0.92)]
    border border-[rgba(18,53,36,0.08)]
    backdrop-blur-[12px]
  `,
}

const PADDING_STYLES: Record<NonNullable<GlassContainerProps['padding']>, string> = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
  xl:   'p-10 md:p-12',
}

const ENTER_VARIANTS = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const GlassContainer = forwardRef<HTMLDivElement, GlassContainerProps>(
  (
    {
      variant = 'default',
      padding = 'lg',
      animate: shouldAnimate = true,
      delay = 0,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        variants={ENTER_VARIANTS}
        initial={shouldAnimate ? 'hidden' : false}
        whileInView={shouldAnimate ? 'visible' : undefined}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          type:      'spring',
          stiffness: 50,
          damping:   20,
          delay,
        }}
        className={cn(
          'rounded-[28px]',
          'shadow-[0_10px_30px_rgba(0,0,0,0.08)]',
          VARIANT_STYLES[variant],
          PADDING_STYLES[padding],
          className
        )}
        {...rest}
      >
        {children}
      </motion.div>
    )
  }
)

GlassContainer.displayName = 'GlassContainer'
