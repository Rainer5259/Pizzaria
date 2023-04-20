import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import Head from 'next/head'

import styles from '../styles/RegisterCategory.module.scss'
import { Header } from '../components/comuns/Header'
export default function Register() {
  return (
    <>
      <Head>
        <title>Pizzaria - Register</title>
      </Head>

      <Header />
      <div className={styles.container}>
        <div className={styles.login}>
          <form>
            <h1>Nova categoria</h1>
            <Input
              type="text"
              className={styles.input}
              placeholder="Nome da Categoria"
            />
            <Button type="submit" className={styles.button} loading={false}>
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
