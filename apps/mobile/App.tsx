import { Provider } from 'react-redux'
import { SafeAreaView, View } from 'react-native'
import Routes from './src/routes'
import store from './src/redux/store'
import Toast from 'react-native-toast-message'
import { colors } from './src/components/theme'
import { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'
export default function App() {
  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync()
    }

    hideSplashScreen()
  }, [])
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <Routes />
      </SafeAreaView>
      <Toast visibilityTime={5000} />
    </Provider>
  )
}
