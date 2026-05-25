import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Dimensions,
} from 'react-native'
import { SafeAreaView }  from 'react-native-safe-area-context'
import { MotiView }      from 'moti'
import { Easing }        from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors, Fonts, FontSizes, Spacing, Radius, Shadows } from '../../constants/theme'

const { width: SCREEN_W } = Dimensions.get('window')

const FARMER = {
  name:      'James Kamau',
  farmerId:  'RW-FMR-04821',
  factory:   'Muthigi-ini',
  initials:  'JK',
}

const KPIS = [
  { label: 'Total Delivered', value: '2,847', unit: 'kg',       delta: '+12%'    },
  { label: 'YTD Earnings',    value: '289K',  unit: 'Ksh',      delta: 'vs 2025' },
  { label: 'Pending Payout',  value: '43,320', unit: 'Ksh',     delta: '285 kg'  },
  { label: 'Cherry Quality',  value: '94.2',  unit: '%',         delta: 'Grade A' },
]

const MONTHLY = [
  { month: 'J', kg: 320 },
  { month: 'F', kg: 410 },
  { month: 'M', kg: 685 },
  { month: 'A', kg: 712 },
  { month: 'M', kg: 355 },
]
const MAX_KG = Math.max(...MONTHLY.map((m) => m.kg))
const BAR_H  = 60

const RECENT = [
  { date: 'May 8',  kg: 145, grade: 'A', status: 'PENDING' },
  { date: 'May 1',  kg: 210, grade: 'A', status: 'PAID'    },
  { date: 'Apr 24', kg: 185, grade: 'B', status: 'PAID'    },
]

export default function OverviewScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── HERO HEADER ──────────────────────────────────────── */}
        <LinearGradient
          colors={[Colors.forest, '#1a4f35']}
          style={styles.hero}
        >
          <MotiView
            from={{ opacity: 0, translateY: -8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 80, delay: 100 }}
            style={styles.heroTop}
          >
            <View>
              <Text style={styles.heroGreeting}>Good afternoon,</Text>
              <Text style={styles.heroName}>{FARMER.name}</Text>
              <Text style={styles.heroMeta}>{FARMER.farmerId} · {FARMER.factory}</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{FARMER.initials}</Text>
            </View>
          </MotiView>

          {/* Season indicator */}
          <MotiView
            from={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 22, stiffness: 80, delay: 220 }}
            style={styles.seasonBadge}
          >
            <View style={styles.dot} />
            <Text style={styles.seasonText}>2026 Season — Active</Text>
          </MotiView>
        </LinearGradient>

        <View style={styles.body}>

          {/* ── KPI GRID ─────────────────────────────────────────── */}
          <View style={styles.kpiGrid}>
            {KPIS.map((kpi, i) => (
              <MotiView
                key={kpi.label}
                from={{ opacity: 0, translateY: 16 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 60, delay: 150 + i * 70 }}
                style={styles.kpiCard}
              >
                <Text style={styles.kpiLabel}>{kpi.label}</Text>
                <View style={styles.kpiValueRow}>
                  <Text style={styles.kpiValue}>{kpi.value}</Text>
                  <Text style={styles.kpiUnit}>{kpi.unit}</Text>
                </View>
                <Text style={styles.kpiDelta}>{kpi.delta}</Text>
              </MotiView>
            ))}
          </View>

          {/* ── MONTHLY CHART ─────────────────────────────────────── */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 60, delay: 450 }}
            style={styles.chartCard}
          >
            <Text style={styles.sectionTitle}>Monthly Deliveries — 2026</Text>
            <View style={styles.chart}>
              {MONTHLY.map((m, i) => (
                <View key={i} style={styles.barGroup}>
                  <Text style={styles.barValue}>{m.kg}</Text>
                  <MotiView
                    from={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      type:     'timing',
                      duration: 600,
                      delay:    500 + i * 80,
                      easing:   Easing.out(Easing.cubic),
                    }}
                    style={[
                      styles.bar,
                      {
                        height:  (m.kg / MAX_KG) * BAR_H,
                        opacity: i === MONTHLY.length - 1 ? 1 : 0.4,
                      },
                    ]}
                  />
                  <Text style={styles.barLabel}>{m.month}</Text>
                </View>
              ))}
            </View>
          </MotiView>

          {/* ── RECENT DELIVERIES ─────────────────────────────────── */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 60, delay: 550 }}
            style={styles.recentCard}
          >
            <View style={styles.recentHeader}>
              <Text style={styles.sectionTitle}>Recent Deliveries</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View all →</Text>
              </TouchableOpacity>
            </View>
            {RECENT.map((d, i) => (
              <View
                key={i}
                style={[styles.deliveryRow, i < RECENT.length - 1 && styles.deliveryBorder]}
              >
                <View>
                  <Text style={styles.deliveryDate}>{d.date}, 2026</Text>
                  <Text style={styles.deliveryKg}>{d.kg} kg</Text>
                </View>
                <View style={styles.deliveryRight}>
                  <View style={[styles.gradeBadge, { backgroundColor: d.grade === 'A' ? Colors.forest : Colors.botanical }]}>
                    <Text style={styles.gradeBadgeText}>Grade {d.grade}</Text>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: d.status === 'PAID' ? Colors.successBg : Colors.warningBg },
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: d.status === 'PAID' ? Colors.success : Colors.warning },
                    ]}>
                      {d.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </MotiView>

          {/* ── PAYOUT SUMMARY ────────────────────────────────────── */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 60, delay: 620 }}
            style={styles.payoutCard}
          >
            <Text style={styles.payoutLabel}>Pending Payout</Text>
            <Text style={styles.payoutAmount}>Ksh 43,320.35</Text>
            <Text style={styles.payoutSub}>
              285 kg at Ksh 152.03/kg · Est. payment June 15
            </Text>
            <TouchableOpacity style={styles.payoutBtn} activeOpacity={0.8}>
              <Text style={styles.payoutBtnText}>View Payout Details</Text>
            </TouchableOpacity>
          </MotiView>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:              { flex: 1, backgroundColor: Colors.forest },
  scroll:            { backgroundColor: Colors.bgPrimary },
  hero:              { paddingHorizontal: Spacing['2xl'], paddingTop: Spacing['2xl'], paddingBottom: Spacing['4xl'] },
  heroTop:           { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.lg },
  heroGreeting:      { fontSize: FontSizes.sm, color: 'rgba(246,241,233,0.55)', letterSpacing: 0.3 },
  heroName:          { fontSize: FontSizes['2xl'], color: Colors.cream, fontFamily: 'Inter_500Medium', marginTop: 2 },
  heroMeta:          { fontSize: FontSizes.xs, color: 'rgba(246,241,233,0.50)', marginTop: 3, letterSpacing: 0.3 },
  avatar:            { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.botanical, alignItems: 'center', justifyContent: 'center' },
  avatarText:        { fontSize: FontSizes.md, color: Colors.forest, fontFamily: 'Inter_500Medium' },
  seasonBadge:       { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.08)', alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
  dot:               { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.botanical },
  seasonText:        { fontSize: FontSizes.xs, color: 'rgba(246,241,233,0.70)', letterSpacing: 0.4 },
  body:              { padding: Spacing.lg, marginTop: -Spacing['2xl'] },
  kpiGrid:           { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.lg },
  kpiCard:           { width: (SCREEN_W - Spacing.lg * 2 - Spacing.sm) / 2, backgroundColor: Colors.bgCard, borderRadius: Radius.xl, padding: Spacing.lg, ...Shadows.card },
  kpiLabel:          { fontSize: FontSizes.xs, color: 'rgba(18,53,36,0.50)', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: Spacing.xs },
  kpiValueRow:       { flexDirection: 'row', alignItems: 'baseline', gap: 3 },
  kpiValue:          { fontSize: FontSizes['3xl'], color: Colors.forest, fontFamily: 'Inter_700Bold', lineHeight: 36 },
  kpiUnit:           { fontSize: FontSizes.sm, color: 'rgba(18,53,36,0.50)' },
  kpiDelta:          { fontSize: FontSizes.xs, color: 'rgba(18,53,36,0.45)', marginTop: 3 },
  chartCard:         { backgroundColor: Colors.bgCard, borderRadius: Radius.xl, padding: Spacing.lg, marginBottom: Spacing.lg, ...Shadows.card },
  sectionTitle:      { fontSize: FontSizes.sm, fontFamily: 'Inter_500Medium', color: Colors.forest, marginBottom: Spacing.lg },
  chart:             { flexDirection: 'row', alignItems: 'flex-end', gap: 8, height: BAR_H + 36 },
  barGroup:          { flex: 1, alignItems: 'center', gap: 4 },
  barValue:          { fontSize: 9, color: 'rgba(18,53,36,0.40)' },
  bar:               { width: '100%', backgroundColor: Colors.forest, borderRadius: 4, transformOrigin: 'bottom' },
  barLabel:          { fontSize: 9, color: 'rgba(18,53,36,0.40)', marginTop: 2 },
  recentCard:        { backgroundColor: Colors.bgCard, borderRadius: Radius.xl, padding: Spacing.lg, marginBottom: Spacing.lg, ...Shadows.card },
  recentHeader:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  viewAll:           { fontSize: FontSizes.xs, color: Colors.forest, letterSpacing: 0.3 },
  deliveryRow:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing.md },
  deliveryBorder:    { borderBottomWidth: 0.5, borderBottomColor: 'rgba(18,53,36,0.06)' },
  deliveryDate:      { fontSize: FontSizes.sm, color: Colors.forest, fontFamily: 'Inter_500Medium' },
  deliveryKg:        { fontSize: FontSizes.xs, color: 'rgba(18,53,36,0.50)', marginTop: 2 },
  deliveryRight:     { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  gradeBadge:        { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  gradeBadgeText:    { fontSize: 9, color: Colors.cream, fontFamily: 'Inter_500Medium', letterSpacing: 0.5 },
  statusBadge:       { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  statusText:        { fontSize: 9, fontFamily: 'Inter_500Medium', letterSpacing: 0.4 },
  payoutCard:        { backgroundColor: Colors.forest, borderRadius: Radius.xl, padding: Spacing.xl, marginBottom: Spacing['2xl'], ...Shadows.forest },
  payoutLabel:       { fontSize: FontSizes.xs, color: 'rgba(246,241,233,0.50)', letterSpacing: 0.7, textTransform: 'uppercase', marginBottom: Spacing.sm },
  payoutAmount:      { fontSize: FontSizes['4xl'], color: Colors.gold, fontFamily: 'Inter_700Bold', lineHeight: 44, marginBottom: Spacing.sm },
  payoutSub:         { fontSize: FontSizes.xs, color: 'rgba(246,241,233,0.55)', lineHeight: 18, marginBottom: Spacing.xl },
  payoutBtn:         { backgroundColor: Colors.gold, borderRadius: 999, paddingVertical: 12, alignItems: 'center' },
  payoutBtnText:     { fontSize: FontSizes.sm, color: '#1a0f00', fontFamily: 'Inter_500Medium' },
})
