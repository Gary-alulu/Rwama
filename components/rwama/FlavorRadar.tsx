'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface FlavorData {
  label: string
  value: number
}

interface FlavorRadarProps {
  data: FlavorData[]
  size?: number
  className?: string
}

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

const DEFAULT_DATA: FlavorData[] = [
  { label: 'Acidity', value: 8.5 },
  { label: 'Body', value: 7.2 },
  { label: 'Sweetness', value: 8.8 },
  { label: 'Aroma', value: 9.1 },
  { label: 'Aftertaste', value: 8.3 },
  { label: 'Balance', value: 8.7 },
]

export function FlavorRadar({ data = DEFAULT_DATA, size = 280, className = '' }: FlavorRadarProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const center = size / 2
  const radius = (size / 2) - 40
  const angleStep = (Math.PI * 2) / data.length
  
  // Generate polygon points
  const points = data.map((item, i) => {
    const angle = i * angleStep - Math.PI / 2
    const value = item.value / 10
    const x = center + Math.cos(angle) * radius * value
    const y = center + Math.sin(angle) * radius * value
    return `${x},${y}`
  }).join(' ')
  
  // Generate grid circles
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0]
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
        {gridLevels.map((level, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius * level}
            fill="none"
            stroke="rgba(18, 53, 36, 0.08)"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        ))}
        
        {/* Axis lines */}
        {data.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2
          const x = center + Math.cos(angle) * radius
          const y = center + Math.sin(angle) * radius
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(18, 53, 36, 0.06)"
              strokeWidth={1}
            />
          )
        })}
        
        {/* Data polygon */}
        <motion.polygon
          points={points}
          fill="rgba(200, 169, 107, 0.15)"
          stroke="#C8A96B"
          strokeWidth={2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Data points */}
        {data.map((item, i) => {
          const angle = i * angleStep - Math.PI / 2
          const value = item.value / 10
          const x = center + Math.cos(angle) * radius * value
          const y = center + Math.sin(angle) * radius * value
          const isHovered = hoveredIndex === i
          
          return (
            <motion.g key={i}>
              <circle
                cx={x}
                cy={y}
                r={isHovered ? 8 : 5}
                fill="#C8A96B"
                stroke="#fff"
                strokeWidth={2}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              />
            </motion.g>
          )
        })}
      </svg>
      
      {/* Labels */}
      {data.map((item, i) => {
        const angle = i * angleStep - Math.PI / 2
        const labelRadius = radius + 30
        const x = center + Math.cos(angle) * labelRadius
        const y = center + Math.sin(angle) * labelRadius
        
        return (
          <div
            key={i}
            className="absolute text-[11px] font-medium text-[rgba(18,53,36,0.6)] uppercase tracking-wider"
            style={{
              left: x,
              top: y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {item.label}
          </div>
        )
      })}
      
      {/* Tooltip */}
      {hoveredIndex !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-forest)] text-white px-4 py-2 rounded-lg text-[13px] font-medium shadow-lg z-10"
        >
          <span className="text-[var(--color-gold)]">{data[hoveredIndex].label}:</span> {data[hoveredIndex].value}/10
        </motion.div>
      )}
    </div>
  )
}

// Sample data for marketplace lots
export const SAMPLE_LOTS: Lot[] = [
  {
    id: 'RW-MUT-24-AA-001',
    name: 'Muthigi-ini AA Top',
    factory: 'Muthigi-ini',
    grade: 'AA',
    altitude: '1,680m',
    process: 'Washed',
    harvest: 'Oct 2024',
    cuppingNotes: ['Blackcurrant', 'Caramel', 'Lime', 'Dark Chocolate'],
    score: 88.5,
    available: 120,
    price: 8.50,
  },
  {
    id: 'RW-KIM-24-AB-002',
    name: 'Kimatu AB Plus',
    factory: 'Kimatu',
    grade: 'AB',
    altitude: '1,720m',
    process: 'Washed',
    harvest: 'Nov 2024',
    cuppingNotes: ['Raspberry', 'Honey', 'Orange Blossom', 'Vanilla'],
    score: 86.0,
    available: 85,
    price: 7.20,
  },
  {
    id: 'RW-MUB-24-AA-003',
    name: 'Muburi AA Select',
    factory: 'Muburi',
    grade: 'AA',
    altitude: '1,750m',
    process: 'Washed',
    harvest: 'Oct 2024',
    cuppingNotes: ['Blueberry', 'Caramel', 'Citrus', 'Milk Chocolate'],
    score: 89.0,
    available: 95,
    price: 9.00,
  },
]
