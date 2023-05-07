import Image from 'next/image'
import { Button } from '../../ui/Button'
import styles from './Styles.module.scss'
import logo from '../../../../public/images/svg/logo.svg'
import logOut from '../../../../public/images/svg/logOut.svg'
import { useContext } from 'react'
import { AuthContext } from '@//contexts/AuthContext'
import Link from 'next/link'

export function Header() {
  const { signOut } = useContext(AuthContext)
  return (
    <div className={styles.header}>
      <Image src={logo} alt="RC Pizzaria" />
      <div className={styles.options}>
        <Link
          className={styles.text}
          href="http://localhost:3000/registerCategory"
        >
          Nova Categoria
        </Link>
        <Link className={styles.text} href="http://localhost:3000/signup">
          Cardapio
        </Link>
        <Button className={styles.logOut} onClick={signOut}>
          <Image src={logOut} alt="LogOut" />
        </Button>
      </div>
    </div>
  )
}
