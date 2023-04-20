import Head from 'next/head'
import styles from './product.module.scss'
import { Header } from '../../components/comuns/Header'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
export default function Product() {
  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <Header />

      <div className={styles.container}>
        <div className={styles.newProductContainer}>
          <form>
            <h1>Novo Produto</h1>
            <select
              name="select"
              placeholder="a"
              className={styles.selectProduct}
            >
              <option disabled={true} selected={true}>
                Selecione o produto
              </option>
              <option>Pizza</option>
              <option>Refri</option>
              <option>Aperitivos</option>
            </select>

            <Input
              type="text"
              className={styles.input}
              placeholder="Nome do item"
            />

            <Input type="text" className={styles.input} placeholder="Valor" />

            <Input
              type="text"
              className={styles.description}
              placeholder="Descrição"
            />

            <Button type="submit" className={styles.button} loading={true}>
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
