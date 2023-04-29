import { ReactNode, createContext } from 'react'
import { api } from '../services/apiClient'
import { toast } from 'react-toastify'
import Router from 'next/router'

type SignUpContextData = {
  signUp: (credentials: SignUpProps) => Promise<void>
}
type SignUpProps = {
  email: string
  password: string
  name: string
}
type SignUpProviderProps = {
  children: ReactNode
}

export const SignUpContext = createContext({} as SignUpContextData)

export function SignUpProvider({ children }: SignUpProviderProps) {
  async function signUp({ email, password, name }: SignUpProps) {
    try {
      const response = await api.post('/users', {
        email,
        password,
        name
      })

      Router.push('/')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'An error occurred')
    }
  }
  return (
    <SignUpContext.Provider value={{ signUp }}>
      {children}
    </SignUpContext.Provider>
  )
}
