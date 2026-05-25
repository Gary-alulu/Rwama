import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MotiView }     from 'moti'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors, FontSizes, Spacing, Radius, Shadows } from '../../constants/theme'

const PENDING = {
  amountKsh:   43320.35,
  weightKg:    285,
  ratePerKg:   152.03,
  estPayDate:  'June 15, 2026',
}

const HISTORY = [
  {
    id:        'PAY-2026-0042',
    period:    'May 1 – 7, 2026',
    amountKsh: 31926.30,
    weightKg:  210,
    status:    'PAID',
    paidAt:    'May 10, 2026',
    method:    'MPesa',
    ref:       'NB4XKQR9',
  },
  {
    id:        'PAY-2026-0038',
    period:    'Apr 17 – 24, 2026',
    amountKsh: 74798.76,
    weightKg:  492,
    status:    'PAID',
    paidAt:    'Apr 28, 2026',
    method:    'MPesa',
    ref:       'NB2XLMQ1',
  },
  {
    id:        'PAY-2026-0031',
    period:    'Apr 3 – 10, 2026',
    amountKsh: 33446.60,
    weightKg:  220,
    status:    'PAID',
    paidAt:    'Apr 15, 2026',
    method:    'MPesa',
    ref:       'NA8QKRP7',
  },
  {
    id:        'PAY-2026-0024',
    period:    'Mar 21 – 28, 2026',
    amountKsh: 53035.92,
    weightKg:  352,
    status:    'PAID',
    paidAt:    'Apr 2, 2026',
    method:    'Bank Transfer',
    ref:       'KCB-2026-0248',
  },
]

const YTD = HISTORY.reduce((sum, p) => sum + p.amountKsh, 0) + PENDING.amountKsh

export default function PayoutsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <LinearGradient
          colors={[Colors.forest, '#1a4f35']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Payouts</Text>
          <Text style={styles.headerSub}>2026 season earnings</Text>

          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 70, delay: 150 }}
            style={styles.ytdCard}
          >
            <Text style={styles.ytdLabel}>Year-to-Date Earnings</Text>
            <Text style={styles.ytdAmount}>
              Ksh {(YTD / 1000).toFixed(1)}K
            </Text>
            <Text style={styles.ytdSub}>at Ksh 152.03 / kg · 2026 rate</Text>
          </MotiView>
        </LinearGradient>

        <View style={styles.body}>

          {/* ── PENDING PAYOUT ────────────────────────────────────── */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 70, delay: 200 }}
            style={styles.pendingCard}
          >
            <View style={styles.pendingTop}>
              <View>
                <Text style={styles.pendingLabel}>Pending Payment</Text>
                <Text style={styles.pendingAmount}>
                  Ksh {PENDING.amountKsh.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </Text>
              </View>
              <View style={styles.pendingBadge}>
                <Text style={styles.pendingBadgeText}>PENDING</Text>
              </View>
            </View>
            <View style={styles.pendingMeta}>
              <Text style={styles.pendingMetaText}>{PENDING.weightKg} kg · Ksh {PENDING.ratePerKg}/kg</Text>
              <Text style={styles.pendingMetaText}>Est. payment {PENDING.estPayDate}</Text>
            </View>
          </MotiView>

          {/* ── RATE CARD ─────────────────────────────────────────── */}
          <MotiView
            from={{ opacity: 0, translateY: 8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 70, delay: 270 }}
            style={styles.rateCard}
          >
            <Text style={styles.rateLabel}>2026 Cherry Rate</Text>
            <Text style={styles.rateValue}>Ksh 152.03</Text>
            <Text style={styles.rateSub}>per kg Grade A cherry · Set by Cooperative Board</Text>
          </MotiView>

          {/* ── HISTORY ───────────────────────────────────────────── */}
          <Text style={styles.sectionTitle}>Payment History</Text>
          <View style={styles.historyCard}>
            {HISTORY.map((p, i) => (
              <MotiView
                key={p.id}
                from={{ opacity: 0, translateX: 10 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'spring', damping: 22, stiffness: 70, delay: 320 + i * 70 }}
              >
                <TouchableOpacity
                  style={[styles.historyRow, i < HISTORY.length - 1 && styles.historyBorder]}
                  activeOpacity={0.7}
                >
                  <View style={styles.historyLeft}>
                    <Text style={styles.historyPeriod}>{p.period}</Text>
                    <Text style={styles.historyKg}>{p.weightKg} kg</Text>
                    <View style={styles.historyRef}>
                      <Text style={styles.historyMethod}>{p.method}</Text>
                      <Text style={styles.historyRefText}>{p.ref}</Text>
                    </View>
                  </View>
                  <View style={styles.historyRight}>
                    <Text style={styles.historyAmount}>
                      Ksh {p.amountKsh.toLocaleString('en-KE', { maximumFractionDigits: 0 })}
                    </Text>
                    <Text style={styles.historyDate}>{p.paidAt}</Text>
                    <View style={styles.paidBadge}>
                      <Text style={styles.paidBadgeText}>✓ PAID</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>

          {/* ── FOOTER INFO ───────────────────────────────────────── */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>About Your Payouts</Text>
            <Text style={styles.infoBody}>
              Cherry payments are calculated at the cooperative board's announced rate per kilogram.
              Payments are disbursed biweekly via MPesa or bank transfer within 7 days of the payment period closing.
              Contact your factory clerk for any payout disputes.
            </Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:              { flex: 1, backgroundColor: Colors.forest },
  scroll:            { backgroundColor: Colors.bgPrimary },
  header:            { paddingHorizontal: Spacing['2xl'], paddingTop: Spacing['2xl'], paddingBottom: Spacing['5xl'] },
  headerTitle:       { fontSize: FontSizes['3xl'], color: Colors.cream, fontFamily: 'Inter_700Bold', lineHeight: 36 },
  headerSub:         { fontSize: FontSizes.xs, color: 'rgba(246,241,233,0.50)', marginTop: 4, marginBottom: Spacing.xl },
  ytdCard:           { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: Radius.xl, padding: Spacing.xl, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.10)' },
  ytdLabel:          { fontSize: FontSizes.xs, color: 'rgba(246,241,233,0.55)', letterSpacing: 0.6, textTransform: 'uppercase' },
  ytdAmount:         { fontSize: FontSizes['4xl'], color: Colors.gold, fontFamily: 'Inter_700Bold', lineHeight: 48, marginTop: Spacing.sm },
  ytdSub:            { fontSize: FontSizes.xs, color: 'rgba(246,241,233,0.45)', marginTop: Spacing.xs },
  body:              { padding: Spacing.lg, marginTop: -Spacing['3xl'] },
  pendingCard:       { backgroundColor: Colors.bgCard, borderRadius: Radius.xl, padding: Spacing.xl, marginBottom: Spacing.md, ...Shadows.card, borderLeftWidth: 4, borderLeftColor: Colors.gold },
  pendingTop:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.md },
  pendingLabel:      { fontSize: FontSizes.xs, color: 'rgba(18,53,36,0.50)', letterSpacing: 0.5, textTransform: 'uppercase' },
  pendingAmount:     { fontSize: FontSizes['2xl'], color: Colors.forest, fontFamily: 'Inter_700Bold', marginTop: 4 },
  pendingBadge:      { backgroundColor: Colors.warningBg, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  pendingBadgeText:  { fontSize: 9, color: Colors.warning, fontFamily: 'Inter_500Medium', letterSpacing: 0.5 },
  pendingMeta:       { gap: 2 },
  pendingMetaText:   { fontSize: FontSizes.xs, color: 'rgba(18,53,36,0.50)' },
  rateCard:          { backgroundColor: Colors.forest, borderRadius: Radius.xl, padding: Spacing.xl, marginBottom: Spacing.xl, ...Shadows.forest },
  rateLabel:         { fontSize: FontSizes.xs, color: 'rgba(246,241,233,0.50)', letterSpacing: 0.6, textTransform: 'uppercase' },
  rateValue:         { fontSize: FontSizes['3xl'], color: Colors.gold, fontFamily: 'Inter_700Bold', lineHeight: 40, marginTop: 6 },
  rateSub:           { fontSize: FontSizes.xs, color: 'rgba(246,241,233,0.50)', marginTop: 4 },
  sectionTitle:      { fontSize: FontSizes.sm, fontFamily: 'Inter_500Medium', color: Colors.forest, marginBottom: Spacing.md },
  historyCard:       { backgroundColor: Colors.bgCard, borderRadius: Radius.xl, overflow: 'hidden', marginBottom: Spacing.xl, ...Shadows.card },
  historyRow:        { flexDirection: 'row', justifyContent: 'space-between', padding: Spacing.lg },
  historyBorder:     { borderBottomWidth: 0.5, borderBottomColor: 'rgba(18,53,36,0.05)' },
  historyLeft:       { flex: 1, gap: 3 },
  historyPeriod:     { fontSize: FontSizes.sm, color: Colors.forest, fontFamily: 'Inter_500Medium' },
  historyKg:         { fontSize: FontSizes.xs, color: 'rgba(18,53,36,0.50)' },
  historyRef:        { flexDirection: 'row', gap: 6, alignItems: 'center', marginTop: 4 },
  historyMethod:     { fontSize: 9, color: 'rgba(18,53,36,0.45)', letterSpacing: 0.3 },
  historyRefText:    { fontSize: 9, color: 'rgba(18,53,36,0.45)', fontFamily: 'Inter_400Regular' },
  historyRight:      { alignItems: 'flex-end', gap: 3 },
  historyAmount:     { fontSize: FontSizes.md, color: Colors.forest, fontFamily: 'Inter_700Bold' },
  historyDate:       { fontSize: FontSizes.xs, color: 'rgba(18,53,36,0.45)' },
  paidBadge:         { backgroundColor: Colors.successBg, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },
  paidBadgeText:     { fontSize: 9, color: Colors.success, fontFamily: 'Inter_500Medium', letterSpacing: 0.4 },
  infoBox:           { backgroundColor: Colors.bgSubtle, borderRadius: Radius.lg, padding: Spacing.lg, marginBottom: Spacing['2xl'] },
  infoTitle:         { fontSize: FontSizes.sm, color: Colors.forest, fontFamily: 'Inter_500Medium', marginBottom: Spacing.sm },
  infoBody:          { fontSize: FontSizes.xs, color: 'rgba(18,53,36,0.60)', lineHeight: 18 },
})
