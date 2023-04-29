import { useContext, useState, FormEvent } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { SignUpContext } from '../../contexts/SignUpContext'
import logo from '../../../public/images/svg/logo.svg'
import styles from './signup.module.scss'
import { toast } from 'react-toastify'
export default function SignUp() {
  const { signUp } = useContext(SignUpContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent) {
    event.preventDefault()

    if (name === '' || email === '' || password === '') {
      toast.error('Preencha todos os campos !')
      return
    }

    setLoading(true)

    let data = {
      email,
      password,
      name
    }

    await signUp(data)

    setLoading(false)
  }
  return (
    <>
      <Head>
        <title>Pizzaria - Sign Up</title>
      </Head>
      <div className={styles.container}>
        <Image src={logo} alt="RC Pizzaria" />
        <div className={styles.login}>
          <form onSubmit={handleSignUp}>
            <Input
              className={styles.input}
              onChange={e => setName(e.target.value)}
              placeholder="Nome da empresa"
              type="text"
              value={name}
            />
            <Input
              className={styles.input}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              type="text"
              value={email}
            />
            <Input
              className={styles.input}
              onChange={e => setPassword(e.target.value)}
              placeholder="Senha"
              type="password"
              value={password}
            />
            <Button className={styles.button} loading={loading} type="submit">
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
