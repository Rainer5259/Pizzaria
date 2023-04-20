import Head from 'next/head'

import styles from '../styles/CreateOrder.module.scss'
import { Header } from '../components/comuns/Header'

export default function Orders() {
  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <Header />

      <div className={styles.content}>
        <h1>
          <b>
            At Soon :<a style={{ color: 'red' }}>)</a>
          </b>
        </h1>
      </div>
    </>
  )
}
