import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../contexts/AuthContext'
import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import { SignUpProvider } from '../contexts/SignUpContext'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SignUpProvider>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000} limit={3} />
      </SignUpProvider>
    </AuthProvider>
  )
}
