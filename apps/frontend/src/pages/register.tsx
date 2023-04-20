import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import Head from 'next/head'
import Image from 'next/image'
import logo from '../../public/images/svg/logo.svg'
import styles from '../styles/Register.module.scss'

export default function Register() {
  return (
    <>
      <Head>
        <title>Pizzaria - Register</title>
      </Head>
      <div className={styles.container}>
        <Image src={logo} alt="RC Pizzaria" />
        <div className={styles.login}>
          <form>
            <Input
              type="text"
              className={styles.input}
              placeholder="Nome da empresa"
            />
            <Input type="text" className={styles.input} placeholder="Email" />
            <Input
              type="password"
              className={styles.input}
              placeholder="Senha"
            />
            <Button type="submit" className={styles.button} loading={false}>
              Cadastrar
            </Button>
          </form>
          <a className={styles.text} href="http://localhost:3000/?">
            Já possuo uma conta
          </a>
        </div>
      </div>
    </>
  )
}
