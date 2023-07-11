import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import Head from 'next/head'

import styles from './category.module.scss'
import { Header } from '../../components/comuns/Header'
import { canSSRAuth } from '@//utils/canSSR/auth'
import { api } from '@//services/apiClient'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
export default function Category() {
  const [name, setName] = useState('')
  async function createCategory(event: FormEvent) {
    event.preventDefault()

    try {
      await api.post('/category', { name })
      toast.success('Categoria cadastrada')
    } catch (e: any) {
      toast.error(e.response?.data?.error || 'An error occurred')
    }
  }
  return (
    <>
      <Head>
        <title>Pizzaria - Register</title>
      </Head>

      <Header />
      <div className={styles.container}>
        <div className={styles.login}>
          <form onSubmit={createCategory}>
            <h1>Nova categoria</h1>
            <Input
              type="text"
              className={styles.input}
              placeholder="Nome da Categoria"
              onChange={e => setName(e.target.value)}
              value={name}
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

export const getServerSideProps = canSSRAuth(async ctx => {
  return { props: {} }
})
