'use client'

import { motion } from 'framer-motion'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { GlassContainer } from '@/components/rwama/GlassContainer'
import { AnimatedStat   } from '@/components/rwama/AnimatedStat'

const PRODUCTION = [
  { month: 'Jan', muthigini: 82,  kimatu: 65,  muburi: 48  },
  { month: 'Feb', muthigini: 91,  kimatu: 78,  muburi: 62  },
  { month: 'Mar', muthigini: 145, kimatu: 122, muburi: 98  },
  { month: 'Apr', muthigini: 178, kimatu: 155, muburi: 112 },
  { month: 'May', muthigini: 203, kimatu: 174, muburi: 138 },
  { month: 'Jun', muthigini: 167, kimatu: 143, muburi: 124 },
]

const PAYOUTS = [
  { month: 'Jan', payout: 14.2 },
  { month: 'Feb', payout: 17.8 },
  { month: 'Mar', payout: 24.5 },
  { month: 'Apr', payout: 31.2 },
  { month: 'May', payout: 28.6 },
  { month: 'Jun', payout: 11.9 },
]

const EXPORTS = [
  { grade: 'AA', pct: 38, lots: 24, color: '#123524' },
  { grade: 'AB', pct: 44, lots: 27, color: '#4E342E' },
  { grade: 'PB', pct: 12, lots:  8, color: '#C8A96B' },
  { grade: 'Domestic', pct: 6, lots: 3, color: '#7DA27D' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[var(--color-forest)] text-[var(--color-cream)] rounded-[12px] px-4 py-3 text-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
      <p className="font-[500] mb-2" style={{ color: 'var(--color-gold)' }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mb-0.5">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="opacity-65 capitalize">{p.dataKey}:</span>
          <span className="font-[500]">{p.value} MT</span>
        </div>
      ))}
    </div>
  )
}

const PayoutTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[var(--color-forest)] text-[var(--color-cream)] rounded-[12px] px-4 py-3 text-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
      <p className="font-[500] mb-1" style={{ color: 'var(--color-gold)' }}>{label}</p>
      <p>Ksh {payload[0]?.value}M paid out</p>
    </div>
  )
}

const springTrans = { type: 'spring', stiffness: 50, damping: 20 }

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[rgba(18,53,36,0.03)] pt-20">
      <div className="max-w-[1320px] mx-auto px-6 py-8">

        {/* ── HEADER ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={springTrans}
          className="mb-8"
        >
          <p className="text-[11px] tracking-[0.1em] uppercase text-[rgba(18,53,36,0.45)] mb-1">
            Admin Console · 2026 Season
          </p>
          <h1
            className="text-[38px] text-[var(--color-forest)]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Rwama Cooperative Analytics
          </h1>
        </motion.div>

        {/* ── KPI ROW ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Intake 2026',  value: 847,     suffix: ' MT',    sub: '+8.4% vs 2025'     },
            { label: 'Active Farmers',     value: 1247,    suffix: '',        sub: '93% retention'    },
            { label: 'Total Payouts',      value: 128,     prefix: 'Ksh ',   suffix: 'M', sub: '@ 152.03/kg' },
            { label: 'Lots Exported',      value: 62,      suffix: '',        sub: '18 countries'     },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTrans, delay: i * 0.07 }}
              className="bg-white border border-[rgba(18,53,36,0.07)] rounded-[22px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              <div className="text-[10px] tracking-[0.07em] uppercase text-[rgba(18,53,36,0.45)] mb-2">
                {kpi.label}
              </div>
              <AnimatedStat
                value={kpi.value}
                suffix={kpi.suffix}
                prefix={kpi.prefix ?? ''}
                label=""
                size="sm"
                valueColor="var(--color-forest)"
                labelColor="transparent"
                delay={i * 120}
              />
              <div className="text-[11px] text-[rgba(18,53,36,0.45)] mt-1">{kpi.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* ── CHARTS ROW ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Production bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={springTrans}
            className="lg:col-span-2 bg-white border border-[rgba(18,53,36,0.07)] rounded-[22px] p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-[12px] font-[500] text-[var(--color-forest)] tracking-[0.04em]">
                  Cherry Intake by Factory
                </div>
                <div className="text-[11px] text-[rgba(18,53,36,0.45)] mt-0.5">Metric tonnes · Jan–Jun 2026</div>
              </div>
              <div className="flex gap-4 text-[10px] text-[rgba(18,53,36,0.55)]">
                {[['#123524', 'Muthigi-ini'], ['#4E342E', 'Kimatu'], ['#7DA27D', 'Muburi']].map(([color, name]) => (
                  <span key={name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={PRODUCTION} barSize={10} barGap={3}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(18,53,36,0.06)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'rgba(18,53,36,0.45)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'rgba(18,53,36,0.45)' }} axisLine={false} tickLine={false} unit="t" />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(18,53,36,0.03)' }} />
                <Bar dataKey="muthigini" fill="#123524" radius={[4, 4, 0, 0]} />
                <Bar dataKey="kimatu"    fill="#4E342E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="muburi"    fill="#7DA27D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Export by grade */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ ...springTrans, delay: 0.1 }}
            className="bg-white border border-[rgba(18,53,36,0.07)] rounded-[22px] p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            <div className="text-[12px] font-[500] text-[var(--color-forest)] tracking-[0.04em] mb-6">
              Export Volume by Grade
            </div>
            <div className="flex flex-col gap-4">
              {EXPORTS.map((ex) => (
                <div key={ex.grade}>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-[rgba(18,53,36,0.65)]">Grade {ex.grade}</span>
                    <div className="flex gap-3">
                      <span className="text-[rgba(18,53,36,0.40)]">{ex.lots} lots</span>
                      <span className="font-[500] text-[var(--color-forest)]">{ex.pct}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-[rgba(18,53,36,0.06)] rounded-[999px] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${ex.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ ...springTrans, delay: 0.2 }}
                      className="h-full rounded-[999px]"
                      style={{ background: ex.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[rgba(18,53,36,0.06)]">
              <div className="text-[10px] tracking-[0.07em] uppercase text-[rgba(18,53,36,0.40)] mb-3">
                Top Markets
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Japan', 'Germany', 'USA', 'UK', 'Norway', 'Australia', 'Sweden', 'Finland'].map((c) => (
                  <span
                    key={c}
                    className="text-[10px] bg-[rgba(18,53,36,0.05)] text-[rgba(18,53,36,0.55)] rounded-[999px] px-2.5 py-1"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── PAYOUT TREND ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={springTrans}
          className="bg-[var(--color-forest)] rounded-[24px] p-7"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[12px] font-[500] tracking-[0.04em]" style={{ color: 'var(--color-gold)' }}>
                Total Farmer Payouts
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: 'rgba(246,241,233,0.45)' }}>
                Ksh Millions · Jan–Jun 2026
              </div>
            </div>
            <div
              className="text-[28px]" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}
            >
              Ksh 128M <span className="text-[14px] opacity-60">YTD</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={PAYOUTS}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'rgba(246,241,233,0.45)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'rgba(246,241,233,0.45)' }} axisLine={false} tickLine={false} unit="M" />
              <Tooltip content={<PayoutTooltip />} cursor={{ stroke: 'rgba(200,169,107,0.3)' }} />
              <Line
                type="monotone"
                dataKey="payout"
                stroke="#C8A96B"
                strokeWidth={2.5}
                dot={{ fill: '#C8A96B', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#C8A96B' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

      </div>
    </div>
  )
}
