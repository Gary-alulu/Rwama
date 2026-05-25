import { Tabs }         from 'expo-router'
import { Platform, View, Text, StyleSheet } from 'react-native'
import type { BottomTabBarProps }           from '@react-navigation/bottom-tabs'
import { TouchableOpacity }                 from 'react-native'
import { Colors, Fonts, Shadows }           from '../../constants/theme'

// ─── Custom icons (inline SVG-style paths) ────────────────────────
function HomeIcon({ active }: { active: boolean }) {
  return (
    <Text style={{ fontSize: 20, color: active ? Colors.gold : 'rgba(246,241,233,0.45)' }}>
      ⌂
    </Text>
  )
}
function TruckIcon({ active }: { active: boolean }) {
  return (
    <Text style={{ fontSize: 18, color: active ? Colors.gold : 'rgba(246,241,233,0.45)' }}>
      ↑
    </Text>
  )
}
function WalletIcon({ active }: { active: boolean }) {
  return (
    <Text style={{ fontSize: 18, color: active ? Colors.gold : 'rgba(246,241,233,0.45)' }}>
      ◈
    </Text>
  )
}
function ShopIcon({ active }: { active: boolean }) {
  return (
    <Text style={{ fontSize: 18, color: active ? Colors.gold : 'rgba(246,241,233,0.45)' }}>
      ◎
    </Text>
  )
}

// ─── Custom tab bar ───────────────────────────────────────────────
function RwamaTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const focused     = state.index === index

        const label = (options.tabBarLabel ?? options.title ?? route.name) as string

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true })
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const IconComponent =
          route.name === 'index'      ? HomeIcon
          : route.name === 'deliveries' ? TruckIcon
          : route.name === 'payouts'    ? WalletIcon
          : ShopIcon

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.75}
          >
            <IconComponent active={focused} />
            <Text
              style={[
                styles.tabLabel,
                { color: focused ? Colors.gold : 'rgba(246,241,233,0.45)' },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection:    'row',
    backgroundColor:  Colors.forest,
    paddingTop:       10,
    paddingBottom:    Platform.OS === 'ios' ? 28 : 12,
    borderTopWidth:   0.5,
    borderTopColor:   'rgba(255,255,255,0.08)',
    ...Shadows.elevated,
  },
  tabItem: {
    flex:            1,
    alignItems:      'center',
    justifyContent:  'center',
    gap:             3,
  },
  tabLabel: {
    fontSize:    10,
    letterSpacing: 0.6,
    fontFamily:  'Inter_500Medium',
    textTransform: 'uppercase',
    marginTop:   2,
  },
})

// ─── Tabs ─────────────────────────────────────────────────────────
export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <RwamaTabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Overview' }}
      />
      <Tabs.Screen
        name="deliveries"
        options={{ title: 'Deliveries' }}
      />
      <Tabs.Screen
        name="payouts"
        options={{ title: 'Payouts' }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{ title: 'Lots' }}
      />
    </Tabs>
  )
}
