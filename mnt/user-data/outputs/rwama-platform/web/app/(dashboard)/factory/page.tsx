'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LuxuryButton } from '@/components/rwama/LuxuryButton'

type CherryGrade = 'A' | 'B' | 'MBUNI'

interface DeliveryEntry {
  farmerId: string
  weightKg: string
  grade:    CherryGrade
}

const TODAY_DELIVERIES = [
  { farmerId: 'RW-FMR-04821', name: 'James Kamau',   kg: 145, grade: 'A',     time: '16:32' },
  { farmerId: 'RW-FMR-01203', name: 'Grace Wangari', kg: 88,  grade: 'A',     time: '16:18' },
  { farmerId: 'RW-FMR-07762', name: 'Peter Njeru',   kg: 212, grade: 'A',     time: '15:55' },
  { farmerId: 'RW-FMR-03345', name: 'Ruth Mwangi',   kg: 67,  grade: 'B',     time: '15:41' },
  { farmerId: 'RW-FMR-09182', name: 'John Gitau',    kg: 156, grade: 'MBUNI', time: '15:20' },
]

const GRADE_COLOR: Record<CherryGrade, string> = {
  A:     '#123524',
  B:     '#7DA27D',
  MBUNI: '#C8A96B',
}
const GRADE_TEXT: Record<CherryGrade, string> = {
  A:     '#F6F1E9',
  B:     '#085041',
  MBUNI: '#1a0f00',
}

const springTrans = { type: 'spring', stiffness: 50, damping: 20 }

export default function FactoryDashboard() {
  const [form, setForm] = useState<DeliveryEntry>({ farmerId: '', weightKg: '', grade: 'A' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)

  const todayTotal = TODAY_DELIVERIES.reduce((sum, d) => sum + d.kg, 0)

  const handleSubmit = async () => {
    if (!form.farmerId || !form.weightKg) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900)) // Simulate API call
    setLoading(false)
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setForm({ farmerId: '', weightKg: '', grade: 'A' }) }, 2500)
  }

  return (
    <div className="min-h-screen bg-[rgba(18,53,36,0.03)] pt-20">
      <div className="max-w-[1100px] mx-auto px-6 py-8">

        {/* ── HEADER ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={springTrans}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <p className="text-[11px] tracking-[0.1em] uppercase text-[rgba(18,53,36,0.45)] mb-1">
              Factory Manager · Muthigi-ini
            </p>
            <h1
              className="text-[32px] text-[var(--color-forest)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Cherry Intake — {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white border border-[rgba(18,53,36,0.07)] rounded-[16px] px-5 py-3 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="text-[10px] tracking-[0.07em] uppercase text-[rgba(18,53,36,0.45)]">Today Total</div>
              <div className="text-[22px] text-[var(--color-forest)]" style={{ fontFamily: 'var(--font-heading)' }}>
                {todayTotal.toLocaleString()} kg
              </div>
            </div>
            <div className="bg-white border border-[rgba(18,53,36,0.07)] rounded-[16px] px-5 py-3 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="text-[10px] tracking-[0.07em] uppercase text-[rgba(18,53,36,0.45)]">Deliveries</div>
              <div className="text-[22px] text-[var(--color-forest)]" style={{ fontFamily: 'var(--font-heading)' }}>
                {TODAY_DELIVERIES.length}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── INTAKE FORM ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTrans, delay: 0.08 }}
            className="lg:col-span-2 bg-white border border-[rgba(18,53,36,0.07)] rounded-[24px] p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] h-fit"
          >
            <h2
              className="text-[22px] text-[var(--color-forest)] mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Log Cherry Intake
            </h2>

            {/* Farmer ID */}
            <div className="mb-5">
              <label className="block text-[11px] tracking-[0.07em] uppercase text-[rgba(18,53,36,0.55)] mb-2">
                Farmer ID
              </label>
              <input
                type="text"
                placeholder="e.g. RW-FMR-04821"
                value={form.farmerId}
                onChange={(e) => setForm({ ...form, farmerId: e.target.value })}
                className="w-full border border-[rgba(18,53,36,0.14)] rounded-[12px] px-4 py-3 text-[14px] text-[var(--color-forest)] placeholder:text-[rgba(18,53,36,0.30)] bg-[rgba(18,53,36,0.02)] focus:outline-none focus:border-[var(--color-forest)] transition-colors"
                style={{ fontFamily: 'monospace', letterSpacing: '0.04em' }}
              />
            </div>

            {/* Weight */}
            <div className="mb-5">
              <label className="block text-[11px] tracking-[0.07em] uppercase text-[rgba(18,53,36,0.55)] mb-2">
                Weight (kg)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  step="0.1"
                  placeholder="0.0"
                  value={form.weightKg}
                  onChange={(e) => setForm({ ...form, weightKg: e.target.value })}
                  className="w-full border border-[rgba(18,53,36,0.14)] rounded-[12px] px-4 py-3 text-[20px] text-[var(--color-forest)] placeholder:text-[rgba(18,53,36,0.20)] bg-[rgba(18,53,36,0.02)] focus:outline-none focus:border-[var(--color-forest)] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-[rgba(18,53,36,0.40)]">
                  kg
                </span>
              </div>
              {form.weightKg && (
                <p className="text-[11px] text-[rgba(18,53,36,0.50)] mt-1.5 pl-1">
                  Est. payout: Ksh {(parseFloat(form.weightKg) * 152.03).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>

            {/* Grade selector */}
            <div className="mb-7">
              <label className="block text-[11px] tracking-[0.07em] uppercase text-[rgba(18,53,36,0.55)] mb-2">
                Cherry Grade
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['A', 'B', 'MBUNI'] as CherryGrade[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setForm({ ...form, grade: g })}
                    className={`
                      py-3 rounded-[12px] text-[12px] font-[500] tracking-[0.05em]
                      border transition-all duration-200
                      ${form.grade === g
                        ? 'border-[var(--color-forest)] bg-[var(--color-forest)] text-[var(--color-cream)]'
                        : 'border-[rgba(18,53,36,0.12)] text-[rgba(18,53,36,0.55)] hover:border-[rgba(18,53,36,0.28)]'
                      }
                    `}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-[rgba(18,53,36,0.40)] mt-1.5 pl-1">
                {form.grade === 'A' ? 'Premium cherry — fully ripe, no defects'
                  : form.grade === 'B' ? 'Standard — slight defects or overripes'
                  : 'Mbuni — dry / natural cherry'}
              </p>
            </div>

            {/* Submit */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full py-4 rounded-[999px] bg-[rgba(125,162,125,0.15)] text-[var(--color-forest)] text-[13px] font-[500] text-center"
                >
                  ✓ Delivery logged successfully
                </motion.div>
              ) : (
                <motion.div key="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <LuxuryButton
                    variant="forest"
                    size="md"
                    loading={loading}
                    onClick={handleSubmit}
                    disabled={!form.farmerId || !form.weightKg}
                    className="w-full justify-center"
                  >
                    {loading ? 'Logging...' : 'Log Delivery'}
                  </LuxuryButton>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── TODAY'S LOG ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTrans, delay: 0.14 }}
            className="lg:col-span-3 bg-white border border-[rgba(18,53,36,0.07)] rounded-[24px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden"
          >
            <div className="px-7 py-5 border-b border-[rgba(18,53,36,0.06)]">
              <h2 className="text-[16px] font-[500] text-[var(--color-forest)]"
                style={{ fontFamily: 'var(--font-heading)' }}>
                Today's Deliveries
              </h2>
            </div>

            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[rgba(18,53,36,0.05)]">
                  {['Time', 'Farmer', 'Weight', 'Grade', 'Payout (est.)'].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-[10px] tracking-[0.07em] uppercase text-[rgba(18,53,36,0.40)] font-[500]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TODAY_DELIVERIES.map((d, i) => (
                  <motion.tr
                    key={d.farmerId}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...springTrans, delay: 0.18 + i * 0.06 }}
                    className={`${i < TODAY_DELIVERIES.length - 1 ? 'border-b border-[rgba(18,53,36,0.04)]' : ''} hover:bg-[rgba(18,53,36,0.02)] transition-colors`}
                  >
                    <td className="px-6 py-4 text-[12px] text-[rgba(18,53,36,0.50)] font-mono">{d.time}</td>
                    <td className="px-6 py-4">
                      <div className="font-[500] text-[var(--color-forest)]">{d.name}</div>
                      <div className="text-[10px] text-[rgba(18,53,36,0.40)] font-mono mt-0.5">{d.farmerId}</div>
                    </td>
                    <td className="px-6 py-4 font-[500] text-[var(--color-forest)]">
                      {d.kg} kg
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-block rounded-[999px] text-[9px] font-[500] tracking-[0.07em] uppercase px-2.5 py-1"
                        style={{ background: GRADE_COLOR[d.grade as CherryGrade], color: GRADE_TEXT[d.grade as CherryGrade] }}
                      >
                        {d.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[rgba(18,53,36,0.65)]">
                      Ksh {(d.kg * 152.03).toLocaleString('en-KE', { maximumFractionDigits: 0 })}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-[rgba(18,53,36,0.08)] bg-[rgba(18,53,36,0.02)]">
                  <td className="px-6 py-4" colSpan={2}>
                    <span className="text-[11px] tracking-[0.05em] uppercase text-[rgba(18,53,36,0.50)]">Total</span>
                  </td>
                  <td className="px-6 py-4 font-[500] text-[var(--color-forest)]">
                    {todayTotal.toLocaleString()} kg
                  </td>
                  <td className="px-6 py-4" />
                  <td className="px-6 py-4 font-[500] text-[var(--color-forest)]">
                    Ksh {(todayTotal * 152.03).toLocaleString('en-KE', { maximumFractionDigits: 0 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
