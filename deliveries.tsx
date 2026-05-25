import { useState, useMemo } from 'react'
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, TextInput, Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MotiView }     from 'moti'
import { router }       from 'expo-router'
import { Colors, FontSizes, Spacing, Radius, Shadows } from '../../constants/theme'

const { width: SCREEN_W } = Dimensions.get('window')

const ALL_DELIVERIES = [
  { id: 'd001', date: 'May 8, 2026',  time: '16:32', kg: 145, grade: 'A',     payout: 22044.35, status: 'PENDING' },
  { id: 'd002', date: 'May 1, 2026',  time: '14:15', kg: 210, grade: 'A',     payout: 31926.30, status: 'PAID'    },
  { id: 'd003', date: 'Apr 24, 2026', time: '15:48', kg: 185, grade: 'B',     payout: 28125.55, status: 'PAID'    },
  { id: 'd004', date: 'Apr 17, 2026', time: '16:02', kg: 307, grade: 'A',     payout: 46673.21, status: 'PAID'    },
  { id: 'd005', date: 'Apr 10, 2026', time: '15:30', kg: 122, grade: 'A',     payout: 18547.66, status: 'PAID'    },
  { id: 'd006', date: 'Apr 3, 2026',  time: '14:55', kg: 98,  grade: 'B',     payout: 14898.94, status: 'PAID'    },
  { id: 'd007', date: 'Mar 28, 2026', time: '16:20', kg: 264, grade: 'A',     payout: 40135.92, status: 'PAID'    },
  { id: 'd008', date: 'Mar 21, 2026', time: '15:08', kg: 88,  grade: 'MBUNI', payout: 8900.00,  status: 'PAID'    },
]

type GradeFilter = 'ALL' | 'A' | 'B' | 'MBUNI'

const GRADE_COLOR: Record<string, string> = {
  A:     Colors.forest,
  B:     Colors.botanical,
  MBUNI: '#C8A96B',
}

export default function DeliveriesScreen() {
  const [filter, setFilter] = useState<GradeFilter>('ALL')
  const [search, setSearch] = useState('')

  const deliveries = useMemo(() => {
    let result = ALL_DELIVERIES
    if (filter !== 'ALL') result = result.filter((d) => d.grade === filter)
    if (search.trim())    result = result.filter((d) => d.date.toLowerCase().includes(search.toLowerCase()))
    return result
  }, [filter, search])

  const totalKg  = deliveries.reduce((s, d) => s + d.kg, 0)
  const totalKsh = deliveries.reduce((s, d) => s + d.payout, 0)

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Deliveries</Text>
          <Text style={styles.headerSub}>{ALL_DELIVERIES.length} total · 2026 season</Text>
        </View>

        {/* ── SUMMARY STRIP ──────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 70, delay: 100 }}
          style={styles.summaryStrip}
        >
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{totalKg.toLocaleString()} kg</Text>
            <Text style={styles.summaryLabel}>Filtered Weight</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              Ksh {(totalKsh / 1000).toFixed(0)}K
            </Text>
            <Text style={styles.summaryLabel}>Filtered Payout</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{deliveries.length}</Text>
            <Text style={styles.summaryLabel}>Deliveries</Text>
          </View>
        </MotiView>

        <View style={styles.body}>

          {/* ── SEARCH ────────────────────────────────────────────── */}
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search by date..."
            placeholderTextColor="rgba(18,53,36,0.35)"
            style={styles.search}
          />

          {/* ── GRADE FILTER ─────────────────────────────────────── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
            contentContainerStyle={styles.filterContent}
          >
            {(['ALL', 'A', 'B', 'MBUNI'] as GradeFilter[]).map((g) => (
              <TouchableOpacity
                key={g}
                onPress={() => setFilter(g)}
                style={[styles.filterChip, filter === g && styles.filterChipActive]}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterChipText, filter === g && styles.filterChipTextActive]}>
                  {g === 'ALL' ? 'All' : `Grade ${g}`}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* ── DELIVERY LIST ─────────────────────────────────────── */}
          <View style={styles.listCard}>
            {deliveries.map((d, i) => (
              <MotiView
                key={d.id}
                from={{ opacity: 0, translateX: 12 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'spring', damping: 22, stiffness: 70, delay: 80 + i * 50 }}
              >
                <TouchableOpacity
                  style={[styles.row, i < deliveries.length - 1 && styles.rowBorder]}
                  activeOpacity={0.7}
                  onPress={() => router.push(`/delivery/${d.id}` as any)}
                >
                  {/* Grade stripe */}
                  <View style={[styles.gradeStripe, { backgroundColor: GRADE_COLOR[d.grade] }]} />

                  <View style={styles.rowBody}>
                    <View style={styles.rowTop}>
                      <View>
                        <Text style={styles.rowDate}>{d.date}</Text>
                        <Text style={styles.rowTime}>{d.time}</Text>
                      </View>
                      <View style={styles.rowRight}>
                        <Text style={styles.rowKg}>{d.kg} kg</Text>
                        <Text style={styles.rowPayout}>
                          Ksh {d.payout.toLocaleString('en-KE', { maximumFractionDigits: 0 })}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.rowBadges}>
                      <View style={[styles.badge, { backgroundColor: GRADE_COLOR[d.grade] }]}>
                        <Text style={styles.badgeText}>{d.grade}</Text>
                      </View>
                      <View style={[
                        styles.badge,
                        { backgroundColor: d.status === 'PAID' ? Colors.successBg : Colors.warningBg },
                      ]}>
                        <Text style={[
                          styles.badgeText,
                          { color: d.status === 'PAID' ? Colors.success : Colors.warning },
                        ]}>
                          {d.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </MotiView>
            ))}

            {deliveries.length === 0 && (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>No deliveries match your filter.</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:                { flex: 1, backgroundColor: Colors.forest },
  scroll:              { backgroundColor: Colors.bgPrimary },
  header:              { backgroundColor: Colors.forest, paddingHorizontal: Spacing['2xl'], paddingTop: Spacing['2xl'], paddingBottom: Spacing['4xl'] },
  headerTitle:         { fontSize: FontSizes['3xl'], color: Colors.cream, fontFamily: 'Inter_700Bold', lineHeight: 36 },
  headerSub:           { fontSize: FontSizes.xs, color: 'rgba(246,241,233,0.50)', marginTop: 4, letterSpacing: 0.3 },
  summaryStrip:        { flexDirection: 'row', backgroundColor: Colors.bgCard, marginHorizontal: Spacing.lg, marginTop: -Spacing.xl, borderRadius: Radius.xl, padding: Spacing.lg, ...Shadows.card },
  summaryItem:         { flex: 1, alignItems: 'center' },
  summaryValue:        { fontSize: FontSizes.lg, color: Colors.forest, fontFamily: 'Inter_700Bold' },
  summaryLabel:        { fontSize: 10, color: 'rgba(18,53,36,0.45)', marginTop: 2, letterSpacing: 0.5, textTransform: 'uppercase', textAlign: 'center' },
  summaryDivider:      { width: 0.5, backgroundColor: 'rgba(18,53,36,0.10)' },
  body:                { padding: Spacing.lg },
  search:              { backgroundColor: Colors.bgCard, borderWidth: 0.5, borderColor: 'rgba(18,53,36,0.14)', borderRadius: Radius.lg, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, fontSize: FontSizes.sm, color: Colors.forest, marginBottom: Spacing.md },
  filterScroll:        { marginBottom: Spacing.lg },
  filterContent:       { gap: Spacing.sm, paddingRight: Spacing.sm },
  filterChip:          { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, borderWidth: 0.5, borderColor: 'rgba(18,53,36,0.15)', backgroundColor: Colors.bgCard },
  filterChipActive:    { backgroundColor: Colors.forest, borderColor: Colors.forest },
  filterChipText:      { fontSize: FontSizes.xs, color: 'rgba(18,53,36,0.60)', letterSpacing: 0.4 },
  filterChipTextActive:{ color: Colors.cream },
  listCard:            { backgroundColor: Colors.bgCard, borderRadius: Radius.xl, overflow: 'hidden', ...Shadows.card },
  row:                 { flexDirection: 'row', alignItems: 'stretch' },
  rowBorder:           { borderBottomWidth: 0.5, borderBottomColor: 'rgba(18,53,36,0.05)' },
  gradeStripe:         { width: 3 },
  rowBody:             { flex: 1, padding: Spacing.lg },
  rowTop:              { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.sm },
  rowDate:             { fontSize: FontSizes.sm, color: Colors.forest, fontFamily: 'Inter_500Medium' },
  rowTime:             { fontSize: FontSizes.xs, color: 'rgba(18,53,36,0.40)', marginTop: 2, fontFamily: 'Inter_400Regular' },
  rowRight:            { alignItems: 'flex-end' },
  rowKg:               { fontSize: FontSizes.md, color: Colors.forest, fontFamily: 'Inter_700Bold' },
  rowPayout:           { fontSize: FontSizes.xs, color: 'rgba(18,53,36,0.55)', marginTop: 2 },
  rowBadges:           { flexDirection: 'row', gap: 6 },
  badge:               { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText:           { fontSize: 9, color: Colors.cream, fontFamily: 'Inter_500Medium', letterSpacing: 0.5 },
  empty:               { padding: Spacing['2xl'], alignItems: 'center' },
  emptyText:           { fontSize: FontSizes.sm, color: 'rgba(18,53,36,0.40)' },
})
