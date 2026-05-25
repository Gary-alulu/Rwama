import { type ClassValue, clsx } from 'clsx'
import { twMerge }               from 'tailwind-merge'

// ─── Tailwind class merge ─────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Currency ────────────────────────────────────────────────────
export function formatKsh(amount: number, compact = false): string {
  if (compact && amount >= 1_000_000) {
    return `Ksh ${(amount / 1_000_000).toFixed(1)}M`
  }
  if (compact && amount >= 1_000) {
    return `Ksh ${(amount / 1_000).toFixed(0)}K`
  }
  return `Ksh ${amount.toLocaleString('en-KE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function computePayout(weightKg: number, ratePerKg = 152.03): number {
  return parseFloat((weightKg * ratePerKg).toFixed(2))
}

// ─── Dates ───────────────────────────────────────────────────────
export function formatDate(date: Date | string, style: 'short' | 'long' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (style === 'long') {
    return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  }
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

// ─── Traceability ────────────────────────────────────────────────
export function buildTraceabilityId(
  factoryCode: 'MUT' | 'KIM' | 'MUB',
  grade:       'AA' | 'AB' | 'PB' | 'C' | 'E' | 'T',
  lotNumber:   number,
  year         = new Date().getFullYear()
): string {
  return `RW-${factoryCode}-${year}-${grade}-${String(lotNumber).padStart(3, '0')}`
}

// ─── Grade styling ───────────────────────────────────────────────
export const GRADE_COLORS: Record<string, { bg: string; text: string }> = {
  AA:     { bg: '#123524', text: '#F6F1E9' },
  AB:     { bg: '#4E342E', text: '#F6F1E9' },
  PB:     { bg: '#C8A96B', text: '#1a0f00' },
  C:      { bg: '#7DA27D', text: '#085041' },
  E:      { bg: '#7DA27D', text: '#085041' },
  T:      { bg: '#E0D7CC', text: '#4E342E' },
}

export function gradeColor(grade: string) {
  return GRADE_COLORS[grade] ?? { bg: '#E0D7CC', text: '#4E342E' }
}

// ─── SCA score label ─────────────────────────────────────────────
export function scaLabel(score: number): string {
  if (score >= 90) return 'Outstanding'
  if (score >= 85) return 'Excellent'
  if (score >= 80) return 'Very Good'
  if (score >= 75) return 'Good'
  return 'Below Specialty'
}

// ─── Farmer ID generation ────────────────────────────────────────
export function generateFarmerId(sequence: number): string {
  return `RW-FMR-${String(sequence).padStart(5, '0')}`
}
