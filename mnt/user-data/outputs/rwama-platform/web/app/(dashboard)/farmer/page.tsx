'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassContainer } from '@/components/rwama/GlassContainer'
import { AnimatedStat   } from '@/components/rwama/AnimatedStat'
import { LuxuryButton   } from '@/components/rwama/LuxuryButton'

const DELIVERIES = [
  { date: 'May 8, 2026',  kg: 145, grade: 'A',  payoutKsh: 22044.35, status: 'PENDING'    },
  { date: 'May 1, 2026',  kg: 210, grade: 'A',  payoutKsh: 31926.30, status: 'PAID'       },
  { date: 'Apr 24, 2026', kg: 185, grade: 'B',  payoutKsh: 28125.55, status: 'PAID'       },
  { date: 'Apr 17, 2026', kg: 307, grade: 'A',  payoutKsh: 46673.21, status: 'PAID'       },
  { date: 'Apr 10, 2026', kg: 122, grade: 'A',  payoutKsh: 18547.66, status: 'PAID'       },
  { date: 'Apr 3, 2026',  kg: 98,  grade: 'B',  payoutKsh: 14898.94, status: 'PAID'       },
]

const MONTHLY = [
  { month: 'Jan', kg: 320 },
  { month: 'Feb', kg: 410 },
  { month: 'Mar', kg: 685 },
  { month: 'Apr', kg: 712 },
  { month: 'May', kg: 355 },
]
const MAX_KG = Math.max(...MONTHLY.map((m) => m.kg))

const GRADE_COLOR: Record<string, string> = {
  A: 'var(--color-forest)',
  B: 'var(--color-botanical)',
}

type Tab = 'overview' | 'deliveries' | 'payouts'

const springTrans = { type: 'spring', stiffness: 50, damping: 20 }

export default function FarmerDashboard() {
  const [tab, setTab] = useState<Tab>('overview')

  return (
    <div className="min-h-screen bg-[rgba(18,53,36,0.03)] pt-20">
      <div className="max-w-[640px] mx-auto px-4 py-8">

        {/* ── FARMER CARD ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={springTrans}
          className="bg-[var(--color-forest)] rounded-[24px] p-6 mb-6 flex items-center gap-4"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-[18px] font-[500] flex-shrink-0"
            style={{ background: 'var(--color-botanical)', color: 'var(--color-forest)' }}
          >
            JK
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[16px] font-[500] text-[var(--color-cream)] truncate"
              style={{ fontFamily: 'var(--font-heading)' }}>
              James Kamau
            </div>
            <div className="text-[11px] text-[rgba(246,241,233,0.55)] tracking-[0.04em] mt-0.5">
              RW-FMR-04821 · Muthigi-ini Factory
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[10px] text-[rgba(246,241,233,0.45)] tracking-[0.07em] uppercase mb-0.5">
              2026 Season
            </div>
            <span className="inline-block text-[11px] font-[500] bg-[rgba(125,162,125,0.2)] text-[var(--color-botanical)] rounded-[999px] px-3 py-0.5">
              Active
            </span>
          </div>
        </motion.div>

        {/* ── KPI CARDS ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: 'Total Delivered',  value: 2847,  suffix: ' kg',  sub: '+12% vs 2025',    delay: 0.05 },
            { label: 'YTD Earnings',     value: 289450, prefix: 'Ksh ', sub: '@ 152.03/kg',    delay: 0.10 },
            { label: 'Pending Payout',   value: 43320,  prefix: 'Ksh ', sub: '285 kg pending',  delay: 0.15 },
            { label: 'Cherry Quality',   value: 94.2,   suffix: '%',    sub: 'Grade A avg.',   delay: 0.20, decimals: 1 },
          ].map((kpi) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTrans, delay: kpi.delay }}
              className="bg-white border border-[rgba(18,53,36,0.07)] rounded-[22px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              <div className="text-[10px] tracking-[0.07em] uppercase text-[rgba(18,53,36,0.45)] mb-2">
                {kpi.label}
              </div>
              <AnimatedStat
                value={kpi.value}
                suffix={kpi.suffix ?? ''}
                prefix={kpi.prefix ?? ''}
                label=""
                decimals={kpi.decimals ?? 0}
                size="sm"
                valueColor="var(--color-forest)"
                labelColor="transparent"
                delay={kpi.delay * 1000}
              />
              <div className="text-[11px] text-[rgba(18,53,36,0.45)] mt-1">{kpi.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* ── TAB BAR ────────────────────────────────────────────── */}
        <div className="flex gap-1 bg-[rgba(18,53,36,0.05)] rounded-[999px] p-1 mb-6">
          {(['overview', 'deliveries', 'payouts'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`
                flex-1 py-2 rounded-[999px] text-[12px] font-[500] capitalize tracking-[0.03em]
                transition-all duration-250
                ${tab === t
                  ? 'bg-[var(--color-forest)] text-[var(--color-cream)] shadow-[0_2px_8px_rgba(18,53,36,0.25)]'
                  : 'text-[rgba(18,53,36,0.55)] hover:text-[var(--color-forest)]'
                }
              `}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ───────────────────────────────────────── */}
        {tab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={springTrans}
          >
            <div className="bg-white border border-[rgba(18,53,36,0.07)] rounded-[22px] p-6 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="text-[12px] font-[500] text-[var(--color-forest)] tracking-[0.04em] mb-5">
                Monthly Deliveries — 2026
              </div>
              <div className="flex items-end gap-2 h-[100px]">
                {MONTHLY.map((m) => (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-[9px] text-[rgba(18,53,36,0.45)]">{m.kg}</div>
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ ...springTrans, delay: 0.1 }}
                      className="w-full rounded-t-[6px] origin-bottom"
                      style={{
                        height: `${(m.kg / MAX_KG) * 72}px`,
                        background: 'var(--color-forest)',
                        opacity: m.month === 'May' ? 1 : 0.35,
                      }}
                    />
                    <div className="text-[9px] text-[rgba(18,53,36,0.45)]">{m.month}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[rgba(18,53,36,0.07)] rounded-[22px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="text-[12px] font-[500] text-[var(--color-forest)] tracking-[0.04em] mb-4">
                Last Delivery
              </div>
              {(() => {
                const last = DELIVERIES[0]
                return (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[22px] text-[var(--color-forest)]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {last.kg} kg
                      </div>
                      <div className="text-[11px] text-[rgba(18,53,36,0.50)] mt-0.5">{last.date}</div>
                    </div>
                    <div className="text-right">
                      <span
                        className="inline-block text-[10px] font-[500] tracking-[0.06em] uppercase rounded-[999px] px-3 py-1 mb-2"
                        style={{ background: GRADE_COLOR[last.grade], color: 'var(--color-cream)' }}
                      >
                        Grade {last.grade}
                      </span>
                      <div className="text-[11px] text-[rgba(18,53,36,0.45)]">
                        Ksh {last.payoutKsh.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </motion.div>
        )}

        {/* ── DELIVERIES TAB ─────────────────────────────────────── */}
        {tab === 'deliveries' && (
          <motion.div
            key="deliveries"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={springTrans}
            className="bg-white border border-[rgba(18,53,36,0.07)] rounded-[22px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            {DELIVERIES.map((d, i) => (
              <div
                key={i}
                className={`flex items-center px-5 py-4 gap-3 ${i < DELIVERIES.length - 1 ? 'border-b border-[rgba(18,53,36,0.05)]' : ''}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-[500] text-[var(--color-forest)]">{d.date}</div>
                  <div className="text-[11px] text-[rgba(18,53,36,0.45)] mt-0.5">
                    {d.kg} kg · {d.payoutKsh.toLocaleString('en-KE', { minimumFractionDigits: 2 })} Ksh
                  </div>
                </div>
                <span
                  className="text-[9px] font-[500] tracking-[0.07em] uppercase rounded-[999px] px-2.5 py-1"
                  style={{ background: GRADE_COLOR[d.grade], color: 'var(--color-cream)' }}
                >
                  {d.grade}
                </span>
                <span
                  className={`text-[9px] font-[500] tracking-[0.05em] uppercase rounded-[999px] px-2.5 py-1 ${
                    d.status === 'PAID'
                      ? 'bg-[rgba(125,162,125,0.15)] text-[var(--color-forest)]'
                      : 'bg-[rgba(200,169,107,0.15)] text-[var(--color-coffee)]'
                  }`}
                >
                  {d.status}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── PAYOUTS TAB ────────────────────────────────────────── */}
        {tab === 'payouts' && (
          <motion.div
            key="payouts"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={springTrans}
          >
            <div className="bg-[var(--color-forest)] rounded-[22px] p-6 mb-4">
              <div className="text-[10px] tracking-[0.09em] uppercase text-[rgba(246,241,233,0.45)] mb-1">
                Pending Payout
              </div>
              <div className="text-[36px] text-[var(--color-gold)]" style={{ fontFamily: 'var(--font-heading)' }}>
                Ksh 43,320.35
              </div>
              <div className="text-[12px] text-[rgba(246,241,233,0.55)] mt-1">
                285 kg · Est. payment June 15, 2026
              </div>
            </div>
            <div className="bg-white border border-[rgba(18,53,36,0.07)] rounded-[22px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="text-[12px] font-[500] text-[var(--color-forest)] mb-4">Payment History</div>
              {[
                { period: 'May 1 – 7, 2026',  amount: 31926.30, ref: 'MPesa: NB4XKQR9' },
                { period: 'Apr 17 – 24, 2026', amount: 74798.76, ref: 'MPesa: NB2XLMQ1' },
                { period: 'Apr 3 – 10, 2026',  amount: 33446.60, ref: 'MPesa: NA8QKRP7' },
              ].map((p, i) => (
                <div key={i} className={`flex justify-between items-center py-3 ${i < 2 ? 'border-b border-[rgba(18,53,36,0.05)]' : ''}`}>
                  <div>
                    <div className="text-[13px] text-[var(--color-forest)]">{p.period}</div>
                    <div className="text-[10px] tracking-[0.03em] text-[rgba(18,53,36,0.40)] mt-0.5 font-mono">{p.ref}</div>
                  </div>
                  <div className="text-[14px] font-[500] text-[var(--color-forest)]">
                    Ksh {p.amount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
