import CryptoJS from 'crypto-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { api } from '../../services/api/api'

const retrieveDecryptedToken = async (): Promise<string | null> => {
  const encryptedToken = await AsyncStorage.getItem('encryptedToken')
  if (encryptedToken) {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, '@token')
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8)
    return decryptedToken
  }
  return null
}

const getInitialToken = async (): Promise<string | null> => {
  const token = await retrieveDecryptedToken()
  return token
}

interface AuthState {
  token: string | null
}

const initialState: AuthState = {
  token: null
}

// Função assíncrona para obter o token inicial
getInitialToken().then(token => {
  initialState.token = token
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload
    }
  }
})

export const { setToken } = authSlice.actions

export const authenticateUser =
  (token: string) => async (dispatch: Dispatch) => {
    try {
      const storageToken = await AsyncStorage.getItem('encryptedToken')
      if (!storageToken) {
        return
        // send user to login screen
      }
      const response = await api.get('/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data.id) {
        dispatch(setToken(token))
      }
    } catch (e) {
      console.log('Do your login')
    }
  }

export default authSlice.reducer
