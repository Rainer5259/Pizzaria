import Head from 'next/head'
import logo from '../../public/images/svg/logo.svg'
import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
export default function Home() {
  return (
    <>
      <Head>
        <title>Pizzaria - Login</title>
      </Head>
      <div className={styles.container}>
        <Image src={logo} alt="RC Pizzaria" />
        <div className={styles.login}>
          <form>
            <Input type="text" placeholder="login" className={styles.input} />
            <Input
              type="password"
              placeholder="senha"
              className={styles.input}
            />
          </form>
          <div>
            <Button type="submit" className={styles.button} loading={false}>
              Acessar
            </Button>
          </div>
          <a className={styles.text} href="http://localhost:3000/register?">
            Registrar Empresa
          </a>
        </div>
      </div>
    </>
  )
}
