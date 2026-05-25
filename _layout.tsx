import { useEffect } from 'react'
import { Stack }      from 'expo-router'
import { StatusBar }  from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter'
import { SafeAreaProvider } from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#123524" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)"     options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen
          name="delivery/[id]"
          options={{
            presentation:      'card',
            headerShown:       true,
            headerTitle:       'Delivery Detail',
            headerStyle:       { backgroundColor: '#123524' },
            headerTintColor:   '#F6F1E9',
            headerTitleStyle:  { fontFamily: 'Inter_500Medium', fontSize: 16 },
          }}
        />
      </Stack>
    </SafeAreaProvider>
  )
}
