import Router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { createContext, ReactNode, useState, useEffect } from 'react'
import { api } from '../services/apiClient'
import { toast } from 'react-toastify'

type AuthContextData = {
  user?: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
}
type UserProps = {
  id: string
  name: string
  email: string
}
type SignInProps = {
  email: string
  password: string
}
type AuthProviderProps = {
  children: ReactNode
}
export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  } catch {
    toast.error('Erro ao tentar deslogar')
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user

  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    //try find the token on cookie
    const { '@nextauth.token': token } = parseCookies()
    setToken(token)
  }, [])

  useEffect(() => {
    if (token) {
      api
        .get('/me')
        .then(async response => {
          const { id, name, email } = await response.data
          setUser({ id, name, email })
        })
        .catch(e => {
          signOut()
          toast.error('Faça o login novamente')
        })
    }
  }, [token])

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', { email, password })
      const { id, name, token } = response.data
      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, //Will expire in 1 month
        path: '/'
      })

      setUser({ id, name, email })

      //Pass to nexts requests the token
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/category')
    } catch (e) {
      toast.error('Erro ao acessar')
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
