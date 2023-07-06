import Lottie from 'lottie-react-native'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { colors } from '../../components/theme'
const SplashScreenAnimated: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <Lottie
      autoPlay
      loop={true}
      source={require('../../../assets/jsonAnimated/splashPizza.json')}
      style={{ flex: 1, backgroundColor: colors.background }}
    />
  )
}

export default SplashScreenAnimated
