'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedStatProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  sublabel?: string
  decimals?: number
  duration?: number
  delay?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  labelColor?: string
  valueColor?: string
  className?: string
}

const SIZE_STYLES = {
  sm: 'text-[32px]',
  md: 'text-[42px]',
  lg: 'text-[56px]',
  xl: 'text-[72px]',
}

export function AnimatedStat({
  value,
  suffix = '',
  prefix = '',
  label,
  sublabel,
  decimals = 0,
  duration = 1800,
  delay = 0,
  size = 'lg',
  labelColor = 'rgba(246,241,233,0.65)',
  valueColor = 'var(--color-gold)',
  className,
}: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [displayValue, setDisplayValue] = useState('0')
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now() + delay

    const tick = (now: number) => {
      if (now < startTime) {
        requestAnimationFrame(tick)
        return
      }
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out expo
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = eased * value
      setDisplayValue(
        decimals > 0
          ? current.toFixed(decimals)
          : Math.round(current).toLocaleString()
      )
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, value, duration, delay, decimals])

  return (
    <div ref={ref} className={cn('flex flex-col', className)}>
      <div
        className={cn('font-[var(--font-heading)] font-normal leading-none tracking-[-0.02em]', SIZE_STYLES[size])}
        style={{ color: valueColor, fontFamily: 'var(--font-heading)' }}
      >
        {prefix}
        {displayValue}
        {suffix}
      </div>
      <div
        className="text-[11px] tracking-[0.1em] uppercase font-[var(--font-body)] mt-2"
        style={{ color: labelColor }}
      >
        {label}
      </div>
      {sublabel && (
        <div
          className="text-[12px] mt-1 opacity-60"
          style={{ color: labelColor }}
        >
          {sublabel}
        </div>
      )}
    </div>
  )
}
