import React, { useEffect, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-get-random-values'
import CryptoJS from 'crypto-js'
import styles from './styles'
import Logo from '../../components/svg/logo'
import Button from '../../components/ui/Button'

import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../../redux/reducers/auth'
import { NavigationProp } from '@react-navigation/native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { RootState } from '../../redux/store'
import SplashScreen from '../SplashScreen'
import { colors } from '../../components/theme'
import { api } from '../../services/api/api'

type RootStackParamList = {
  CreateOrder: undefined
}

type OpenTableScreenNavigationProp = NavigationProp<
  RootStackParamList,
  'CreateOrder'
>

type Props = {
  navigation: OpenTableScreenNavigationProp
}
const Login: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('rc@email.com')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const token = useSelector((state: RootState) => state.auth.token)
  const dispatch = useDispatch()

  const storeEncryptedToken = async (token: string) => {
    const encryptedToken = CryptoJS.AES.encrypt(token, '@token').toString()
    try {
      await AsyncStorage.setItem('encryptedToken', encryptedToken)
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: `${e.response?.data?.error}`
      })
    }
  }

  const handleLogin = async () => {
    try {
      const response = await api.post('/session', {
        email: email,
        password: password
      })
      console.log('chegou')
      if (response.data.id) {
        storeEncryptedToken(response.data.token)
        dispatch(setToken(response.data.token))
        navigation.reset({
          index: 0,
          routes: [{ name: 'CreateOrder' }]
        })
        return Toast.show({
          type: 'success',
          text1: 'Bem vindo de volta'
        })
      }
    } catch (e: any) {
      console.log(JSON.stringify(e))
      Toast.show({
        type: 'error',
        text1: `${
          e.response?.data?.message || 'Ocorreu um erro, tente novamente.'
        } `
      })
    }
  }
  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const encryptedToken = await AsyncStorage.getItem('encryptedToken')
        if (encryptedToken) {
          const bytes = CryptoJS.AES.decrypt(encryptedToken, '@token')
          const decryptedToken = bytes.toString(CryptoJS.enc.Utf8)

          const response = await api.get('/me', {
            headers: { Authorization: `Bearer ${decryptedToken}` }
          })

          if (await response.data.id) {
            dispatch(setToken(decryptedToken))
            return navigation.reset({
              index: 0,
              routes: [{ name: 'CreateOrder' }]
            })
          }
          return await AsyncStorage.removeItem('encryptedToken')
        }
      } catch (e: any) {
        if (e.response.status === 401) {
          return
        }
        Toast.show({ type: 'error', text1: e.response?.data?.message })
      }
    }
    // isAuthenticated()
  }, [])
  useEffect(() => {
    if (token !== null || token !== undefined) {
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    }
  }, [token])
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          textContentType="emailAddress"
          placeholder="Seu email"
          placeholderTextColor={colors.placeholder}
          onChangeText={e => setEmail(e)}
        />
        <TextInput
          style={styles.input}
          placeholder="sua senha"
          placeholderTextColor={colors.placeholder}
          onChangeText={e => setPassword(e)}
          secureTextEntry={true}
        />
        <Button style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.text}>Acessar</Text>
        </Button>
      </View>
    </View>
  )
}

export default Login
