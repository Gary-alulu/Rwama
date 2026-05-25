import { Platform } from 'react-native'

// ─── Brand palette ────────────────────────────────────────────────
export const Colors = {
  forest:     '#123524',
  coffee:     '#4E342E',
  cream:      '#F6F1E9',
  gold:       '#C8A96B',
  botanical:  '#7DA27D',

  // Tints
  forest10:   'rgba(18, 53, 36, 0.10)',
  forest20:   'rgba(18, 53, 36, 0.20)',
  forest60:   'rgba(18, 53, 36, 0.60)',
  gold20:     'rgba(200, 169, 107, 0.20)',
  cream80:    'rgba(246, 241, 233, 0.80)',
  white10:    'rgba(255, 255, 255, 0.10)',
  white15:    'rgba(255, 255, 255, 0.15)',

  // Semantic
  success:    '#3B6D11',
  successBg:  '#EAF3DE',
  warning:    '#7A4A00',
  warningBg:  '#FEF3DC',
  error:      '#8B1D1D',
  errorBg:    '#FEEAEA',

  // Surfaces
  bgPrimary:  '#F6F1E9',
  bgCard:     '#FFFFFF',
  bgSubtle:   '#F0EBE2',
  border:     'rgba(18, 53, 36, 0.08)',
  borderMid:  'rgba(18, 53, 36, 0.14)',
} as const

// ─── Typography ───────────────────────────────────────────────────
export const Fonts = {
  heading:  Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }),
  body:     Platform.select({ ios: 'System',  android: 'Roboto', default: 'sans-serif' }),
  mono:     Platform.select({ ios: 'Menlo',   android: 'monospace', default: 'monospace' }),
} as const

export const FontSizes = {
  xs:    11,
  sm:    13,
  md:    15,
  lg:    17,
  xl:    20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 38,
  '5xl': 48,
} as const

// ─── Spacing ──────────────────────────────────────────────────────
export const Spacing = {
  xs:    4,
  sm:    8,
  md:    12,
  lg:    16,
  xl:    20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 56,
} as const

// ─── Border radius ────────────────────────────────────────────────
export const Radius = {
  sm:        8,
  md:        12,
  lg:        16,
  xl:        20,
  container: 24,
  full:      999,
} as const

// ─── Shadows ──────────────────────────────────────────────────────
export const Shadows = {
  card: {
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius:  8,
    elevation:     3,
  },
  elevated: {
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius:  20,
    elevation:     8,
  },
  forest: {
    shadowColor:   '#123524',
    shadowOffset:  { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius:  16,
    elevation:     6,
  },
} as const
