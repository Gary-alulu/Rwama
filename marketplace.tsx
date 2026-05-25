import { useState, useMemo } from 'react'
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MotiView }     from 'moti'
import { Colors, FontSizes, Spacing, Radius, Shadows } from '../../constants/theme'

const { width: SCREEN_W } = Dimensions.get('window')

const LOTS = [
  {
    id:          'RW-MUT-2026-AA-001',
    grade:       'AA',
    factory:     'Muthigi-ini',
    scaScore:    87.5,
    moisture:    11.2,
    bags:        48,
    priceUsd:    8.40,
    method:      'Fully Washed',
    flavors:     ['Blackcurrant', 'Citrus Zest', 'Dark Chocolate', 'Jasmine'],
    available:   true,
    accentColor: Colors.forest,
    textColor:   Colors.cream,
  },
  {
    id:          'RW-KIM-2026-AB-042',
    grade:       'AB',
    factory:     'Kimatu',
    scaScore:    85.0,
    moisture:    11.8,
    bags:        62,
    priceUsd:    6.80,
    method:      'Fully Washed',
    flavors:     ['Stone Fruit', 'Caramel', 'Honey', 'Bergamot'],
    available:   true,
    accentColor: Colors.coffee,
    textColor:   Colors.cream,
  },
  {
    id:          'RW-MUB-2026-PB-018',
    grade:       'PB',
    factory:     'Muburi',
    scaScore:    83.5,
    moisture:    12.1,
    bags:        35,
    priceUsd:    9.20,
    method:      'Fully Washed',
    flavors:     ['Red Berry', 'Toffee', 'Nutmeg', 'Vanilla'],
    available:   true,
    accentColor: Colors.gold,
    textColor:   '#1a0f00',
  },
]

type GradeFilter = 'ALL' | 'AA' | 'AB' | 'PB'

export default function MarketplaceScreen() {
  const [filter, setFilter] = useState<GradeFilter>('ALL')

  const lots = useMemo(
    () => filter === 'ALL' ? LOTS : LOTS.filter((l) => l.grade === filter),
    [filter]
  )

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Live Lots</Text>
          <Text style={styles.headerSub}>
            {LOTS.length} lots available · FOB Mombasa
          </Text>
        </View>

        <View style={styles.body}>

          {/* ── FILTERS ─────────────────────────────────────────── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
            contentContainerStyle={styles.filterContent}
          >
            {(['ALL', 'AA', 'AB', 'PB'] as GradeFilter[]).map((g) => (
              <TouchableOpacity
                key={g}
                onPress={() => setFilter(g)}
                style={[styles.chip, filter === g && styles.chipActive]}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, filter === g && styles.chipTextActive]}>
                  {g === 'ALL' ? 'All Grades' : `Grade ${g}`}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* ── LOT CARDS ─────────────────────────────────────────── */}
          {lots.map((lot, i) => (
            <MotiView
              key={lot.id}
              from={{ opacity: 0, translateY: 16 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 60, delay: 80 + i * 90 }}
              style={styles.lotCard}
            >
              {/* Card header */}
              <View style={[styles.lotHeader, { backgroundColor: lot.accentColor }]}>
                <View>
                  <Text style={[styles.gradeName, { color: lot.textColor }]}>
                    Grade {lot.grade}
                  </Text>
                  <Text style={[styles.factoryName, { color: lot.textColor, opacity: 0.75 }]}>
                    {lot.factory} Factory
                  </Text>
                </View>
                <View style={styles.scaBlock}>
                  <Text style={[styles.scaScore, { color: lot.textColor }]}>
                    {lot.scaScore.toFixed(1)}
                  </Text>
                  <Text style={[styles.scaLabel, { color: lot.textColor, opacity: 0.65 }]}>
                    SCA
                  </Text>
                </View>
              </View>

              {/* Traceability ID */}
              <View style={styles.traceRow}>
                <Text style={styles.traceLabel}>Traceability ID</Text>
                <Text style={styles.traceId}>{lot.id}</Text>
              </View>

              {/* Details */}
              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Moisture</Text>
                  <Text style={styles.detailValue}>{lot.moisture}%</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Bags</Text>
                  <Text style={styles.detailValue}>{lot.bags}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Process</Text>
                  <Text style={styles.detailValue}>Washed</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Price</Text>
                  <Text style={styles.detailValue}>USD {lot.priceUsd}/kg</Text>
                </View>
              </View>

              {/* Flavor tags */}
              <View style={styles.flavorsSection}>
                <Text style={styles.flavorsLabel}>Flavor Profile</Text>
                <View style={styles.flavorsRow}>
                  {lot.flavors.map((f) => (
                    <View key={f} style={styles.flavorTag}>
                      <Text style={styles.flavorTagText}>{f}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* CTA */}
              <TouchableOpacity
                style={[styles.ctaBtn, { backgroundColor: lot.accentColor }]}
                activeOpacity={0.8}
              >
                <Text style={[styles.ctaBtnText, { color: lot.textColor }]}>
                  Request Sample
                </Text>
              </TouchableOpacity>
            </MotiView>
          ))}

          {/* ── INFO FOOTER ──────────────────────────────────────── */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>About Rwama Lots</Text>
            <Text style={styles.infoBody}>
              All prices are FOB Mombasa. Minimum order is one full bag (60 kg).
              SCA cupping sheets, moisture analysis, and full traceability chains
              are available upon request. Contact the cooperative's export desk for shipping quotes.
            </Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:            { flex: 1, backgroundColor: Colors.forest },
  scroll:          { backgroundColor: Colors.bgPrimary },
  header:          { backgroundColor: Colors.forest, paddingHorizontal: Spacing['2xl'], paddingTop: Spacing['2xl'], paddingBottom: Spacing['3xl'] },
  headerTitle:     { fontSize: FontSizes['3xl'], color: Colors.cream, fontFamily: 'Inter_700Bold', lineHeight: 36 },
  headerSub:       { fontSize: FontSizes.xs, color: 'rgba(246,241,233,0.50)', marginTop: 4 },
  body:            { padding: Spacing.lg, marginTop: -Spacing.xl },
  filterScroll:    { marginBottom: Spacing.lg },
  filterContent:   { gap: Spacing.sm, paddingRight: Spacing.sm },
  chip:            { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, borderWidth: 0.5, borderColor: 'rgba(18,53,36,0.15)', backgroundColor: Colors.bgCard },
  chipActive:      { backgroundColor: Colors.forest, borderColor: Colors.forest },
  chipText:        { fontSize: FontSizes.xs, color: 'rgba(18,53,36,0.60)', letterSpacing: 0.4 },
  chipTextActive:  { color: Colors.cream },
  lotCard:         { backgroundColor: Colors.bgCard, borderRadius: Radius.xl, overflow: 'hidden', marginBottom: Spacing.lg, ...Shadows.card },
  lotHeader:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.xl },
  gradeName:       { fontSize: FontSizes.xl, fontFamily: 'Inter_700Bold' },
  factoryName:     { fontSize: FontSizes.xs, marginTop: 2, letterSpacing: 0.3 },
  scaBlock:        { alignItems: 'flex-end' },
  scaScore:        { fontSize: FontSizes['4xl'], fontFamily: 'Inter_700Bold', lineHeight: 44 },
  scaLabel:        { fontSize: FontSizes.xs, letterSpacing: 0.8 },
  traceRow:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, backgroundColor: Colors.bgSubtle },
  traceLabel:      { fontSize: 10, color: 'rgba(18,53,36,0.45)', letterSpacing: 0.5, textTransform: 'uppercase' },
  traceId:         { fontSize: 11, color: Colors.forest, fontFamily: 'Inter_500Medium', letterSpacing: 0.5 },
  detailsGrid:     { flexDirection: 'row', padding: Spacing.lg, gap: Spacing.sm },
  detailItem:      { flex: 1, alignItems: 'center' },
  detailLabel:     { fontSize: 9, color: 'rgba(18,53,36,0.40)', letterSpacing: 0.5, textTransform: 'uppercase', textAlign: 'center' },
  detailValue:     { fontSize: FontSizes.sm, color: Colors.forest, fontFamily: 'Inter_500Medium', marginTop: 3, textAlign: 'center' },
  flavorsSection:  { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.lg },
  flavorsLabel:    { fontSize: 10, color: 'rgba(18,53,36,0.40)', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: Spacing.sm },
  flavorsRow:      { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  flavorTag:       { backgroundColor: Colors.bgSubtle, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  flavorTagText:   { fontSize: 10, color: 'rgba(18,53,36,0.65)' },
  ctaBtn:          { marginHorizontal: Spacing.xl, marginBottom: Spacing.xl, borderRadius: 999, paddingVertical: 13, alignItems: 'center' },
  ctaBtnText:      { fontSize: FontSizes.sm, fontFamily: 'Inter_700Bold', letterSpacing: 0.4 },
  infoCard:        { backgroundColor: Colors.bgSubtle, borderRadius: Radius.lg, padding: Spacing.lg, marginBottom: Spacing['2xl'] },
  infoTitle:       { fontSize: FontSizes.sm, color: Colors.forest, fontFamily: 'Inter_500Medium', marginBottom: Spacing.sm },
  infoBody:        { fontSize: FontSizes.xs, color: 'rgba(18,53,36,0.60)', lineHeight: 18 },
})
