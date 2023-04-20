import Head from 'next/head'
import logo from '../../public/images/svg/logo.svg'
import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { AuthContext } from '../contexts/AuthContext'
import { FormEvent, useContext } from 'react'

export default function Home() {
  const { signIn } = useContext(AuthContext)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()
    let data = {
      email: 'RCpizzaria@email.com',
      password: '123'
    }
    await signIn(data)
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
            <Input type="text" placeholder="login" className={styles.input} />
            <Input
              type="password"
              placeholder="senha"
              className={styles.input}
            />

            <Button
              type="submit"
              className={styles.button}
              loading={false}
              // onClick={() => signIn()}
            >
              Acessar
            </Button>
          </form>
          <a className={styles.text} href="http://localhost:3000/register?">
            Registrar Empresa
          </a>
        </div>
      </div>
    </>
  )
}
