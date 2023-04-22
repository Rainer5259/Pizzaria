import { ReactNode, createContext } from 'react'
import { api } from '../services/apiClient'

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
      console.log('Chamou response', response)
      // Router.push('/')
    } catch (e) {
      console.log('Erro ao cadastrar', e)
    }
  }
  return (
    <SignUpContext.Provider value={{ signUp }}>
      {children}
    </SignUpContext.Provider>
  )
}
