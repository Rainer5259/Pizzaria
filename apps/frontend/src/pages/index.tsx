import Head from 'next/head'
import logo from '../../public/images/svg/logo.svg'
import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { AuthContext } from '../contexts/AuthContext'
import { FormEvent, useContext, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function Home() {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  async function handleLogin(event: FormEvent) {
    event.preventDefault()
    let data = {
      email,
      password
    }
    if (email === '' || password === '') {
      return toast.error('Informe as credenciais')
    }
    setLoading(true)

    await signIn(data)

    setLoading(false)
  }
  return (
    <>
      <Head>
        <title>Pizzaria - Login</title>
      </Head>
      <div className={styles.container}>
        <Image src={logo} alt="RC Pizzaria" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              type="text"
              placeholder="login"
              className={styles.input}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="senha"
              className={styles.input}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Button type="submit" className={styles.button} loading={loading}>
              Acessar
            </Button>
          </form>
          <Link href="/signup" className={styles.text}>
            Não tem uma conta? Registre sua Empresa.
          </Link>
        </div>
      </div>
    </>
  )
}
