import Head from 'next/head'
import styles from './product.module.scss'
import { Header } from '../../components/comuns/Header'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { api } from '@//services/apiClient'
import { toast } from 'react-toastify'
import { FiUpload } from 'react-icons/fi'
import { canSSRAuth } from '@//utils/canSSR/auth'
import { setupAPIClient } from '@//services/api'

type ItemProps = {
  id: string
  name: string
}
interface CategoryProps {
  categoryList: ItemProps[]
}
export default function Product({ categoryList }: CategoryProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const [avatarUrl, setAvatarUrl] = useState('')
  const [imageAvatar, setImageAvatar] = useState<any>(null)

  const [categories, setCategories] = useState(categoryList || [])
  const [categorySelected, setCategorySelected] = useState(0)

  const [loading, setLoading] = useState(false)

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return
    }

    const image = e.target.files[0]

    if (!image) {
      return
    }
    if (image.type === 'image/jpeg' || 'image/png') {
      setImageAvatar(image)
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))
    }
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    try {
      const data = new FormData()
      if (
        name === '' ||
        price === '' ||
        description === '' ||
        imageAvatar === null
      ) {
        toast.error('Preencha todos os campos')
        return
      }
      data.append('name', name)
      data.append('price', price)
      data.append('description', description)
      data.append('category_id', categoryList[categorySelected].id)
      data.append('file', imageAvatar)

      const apiClient = setupAPIClient()
      await apiClient.post('/product', data)
    } catch (e: any) {
      toast.error(e.response?.data?.error || 'An error occurred')
    } finally {
      setName('')
      setPrice('')
      setDescription('')
      setImageAvatar(null)
      setAvatarUrl('')
      setLoading(false)
    }
  }
  function handleCategory(event: any) {
    setCategorySelected(event.target.value)
  }
  const Select = () => {
    return (
      <select
        className={styles.selectProduct}
        value={categorySelected}
        onChange={handleCategory}
      >
        <option disabled value="">
          Selecione uma categoria
        </option>
        {categories.map((item, index) => (
          <option key={item.id} value={index}>
            {item.name}
          </option>
        ))}
      </select>
    )
  }
  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <Header />

      <div className={styles.container}>
        <div className={styles.newProductContainer}>
          <h1>Novo Produto</h1>
          <form onSubmit={handleRegister}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={25} color="FFF" />
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              ></input>
              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="productPhoto"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <Select />
            <Input
              type="text"
              className={styles.input}
              placeholder="Nome do produto"
              onChange={e => setName(e.target.value)}
            />

            <Input
              type="text"
              className={styles.input}
              placeholder="Valor"
              onChange={e => setPrice(e.target.value)}
            />

            <Input
              type="text"
              className={styles.description}
              placeholder="Descrição"
              onChange={e => setDescription(e.target.value)}
            />

            <Button type="submit" className={styles.button} loading={loading}>
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
  const apliClient = setupAPIClient(ctx)
  const response = await apliClient.get('/category')
  return { props: { categoryList: response.data } }
})
