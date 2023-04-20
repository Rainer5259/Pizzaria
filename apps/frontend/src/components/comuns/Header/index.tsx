import Image from 'next/image'
import { Button } from '../../ui/Button'
import styles from './Styles.module.scss'
import logo from '../../../../public/images/svg/logo.svg'
import logOut from '../../../../public/images/svg/logOut.svg'

export function Header() {
  return (
    <div className={styles.header}>
      <Image src={logo} alt="RC Pizzaria" />
      <div className={styles.options}>
        <a
          className={styles.text}
          href="http://localhost:3000/registerCategory"
        >
          Nova Categoria
        </a>
        <a className={styles.text}>Cardapio</a>
        <Button className={styles.logOut}>
          <Image src={logOut} alt="LogOut" />
        </Button>
      </div>
    </div>
  )
}
