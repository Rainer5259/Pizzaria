import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { RootStackParamList } from '../../routes'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { colors } from '../../components/theme'
import { api } from '../../services/api/api'
import styles from './styles'
import { Order, Category, OrderDetails, Product } from '../../types/index'
import {
  CommonActions,
  RouteProp,
  useNavigation
} from '@react-navigation/native'
import ModalOrderDetails from '../../components/ui/ModalOrderDetails'
import ButtonIoniconsCustomizable from '../../components/ui/ButtonIoniconsCustomizable'
type OrderCustomizingScreenRouteProp = RouteProp<
  RootStackParamList,
  'OrderCustomizing'
>

type Props = {
  route: OrderCustomizingScreenRouteProp
}

const OrderCustomizing: React.FC<Props> = ({ route }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [order, setOrder] = useState<Order | null>(null)
  const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([])
  const [category, setCategory] = useState<Category[]>([])
  const [product, setProduct] = useState<Product[]>([])
  const [amount, setAmount] = useState<number>(1)
  const [selectedProduct, setSelectedProduct] = useState<string>('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const token = useSelector((state: RootState) => state.auth.token)
  const { order_id } = route.params
  const navigation = useNavigation()

  const fetchCategoriesFromAPI = async () => {
    try {
      const response = await api.get('/category', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setCategories(response.data)

      return
    } catch (e: any) {
      Toast.show({
        type: 'info',
        text1: `${e.response?.data?.error}`
      })
    }
  }

  const fetchOrderByID = async () => {
    try {
      const response = await api.get('/orders', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data) {
        const currentOrder = response.data.find(
          (item: any) => item.id === order_id
        )
        if (await currentOrder) {
          return setOrder(currentOrder)
        }
      }
    } catch (e) {
      throw e
    }
  }

  const fetchProductsByCategory = async () => {
    try {
      if (!categories.length) return
      const response = await api.get(`/product?category_id=${category[0].id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProduct(response.data)
    } catch (error) {
      console.log('Erro ao buscar produtos por categoria:', error)
    }
  }

  const fetchOrderDetails = async () => {
    try {
      const response = await api.get(`/order/detail?order_id=${order_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setOrderDetails(response.data)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro, ao buscar detalhes do pedido'
      })
    }
  }
  const handleAddItemToOrder = async () => {
    try {
      const existAlreadyItem = orderDetails.some(
        item => item.product_id === selectedProduct
      )
      if (existAlreadyItem) {
        Toast.show({
          type: 'info',
          text1: 'Este item já está na lista'
        })
        return
      }
      await api.post(
        '/order/add',
        {
          order_id: order_id,
          product_id: selectedProduct,
          amount: amount
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setAmount(1)
      fetchOrderDetails()
    } catch (e: any) {
      Toast.show({
        type: 'info',
        text1: `${e.response?.data?.error}`
      })
    }
  }
  const handleRemoveItem = async (id: string) => {
    try {
      await api.delete(`/order/remove?item_id=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchOrderDetails()
    } catch (e) {
      return Toast.show({
        type: 'error',
        text1: 'Erro ao tentar remover item'
      })
    }
  }
  const handleSendOrder = async () => {
    try {
      if (orderDetails.length === 0) {
        return Toast.show({
          type: 'error',
          text1: 'Nenhum item adicionado ao pedido'
        })
      }

      const response = await api.put(
        `/order/send`,
        { order_id: order_id },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      if (response.data.id) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'CreateOrder' }]
          })
        )
        setOrderDetails([])
        return Toast.show({ type: 'success', text1: 'Pedido enviado' })
      }
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: `${'Occorreu um erro! ' || e.message}`
      })
    }
  }
  useEffect(() => {
    fetchOrderByID()
    fetchCategoriesFromAPI()
    fetchOrderDetails()
  }, [])

  useEffect(() => {
    if (categories.length > 0) {
      setCategory(categories.slice(0, 1))
    }
  }, [categories])

  useEffect(() => {
    if (product.length > 0) {
      setSelectedProduct(product[0].id)
    }
  }, [product])

  useEffect(() => {
    fetchProductsByCategory()
  }, [category])
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.title, { color: 'red' }]}>Mesa</Text>
        <Text style={[styles.title, { left: 10 }]}>{order?.table}</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={category.length > 0 && category[0].name}
          onValueChange={(itemValue, itemIndex) => {
            const selectedCategory = categories.find(
              (category: any) => category.name === itemValue
            )
            if (selectedCategory) {
              setCategory([
                { id: selectedCategory.id, name: selectedCategory.name }
              ])
            }
          }}
        >
          {categories.map((item: any) => (
            <Picker.Item
              key={item.id}
              label={`${item.name}`}
              value={item.name}
              color="white"
            />
          ))}
        </Picker>

        <Picker
          style={styles.picker}
          selectedValue={selectedProduct}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedProduct(itemValue)
          }}
        >
          {product.map(item => (
            <Picker.Item
              key={item.id}
              label={item.name}
              value={item.id}
              color="white"
            />
          ))}
        </Picker>
      </View>
      <View style={styles.selectAmountContainer}>
        <ButtonIoniconsCustomizable
          useIcon={true}
          name="add-circle-sharp"
          color={colors.buttonBackgroundPrimary}
          size={40}
          style={styles.addItemButton}
          styleIcon={{ left: 3 }}
          onPress={() => {
            handleAddItemToOrder()
          }}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold'
          }}
        >
          Quantidade
        </Text>
        <ButtonIoniconsCustomizable
          useIcon={true}
          name="remove"
          size={40}
          color={colors.buttonBackgroundPrimary}
          onPress={() =>
            amount >= 2 && setAmount(currentAmount => currentAmount - 1)
          }
        />
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            top: 2
          }}
        >
          {amount}
        </Text>

        <ButtonIoniconsCustomizable
          useIcon={true}
          name="add"
          size={40}
          color={colors.buttonBackgroundSecondary}
          onPress={() => {
            amount < 10 && setAmount(currentAmount => currentAmount + 1)
          }}
        />
      </View>
      <ScrollView
        scrollEnabled={orderDetails.length > 3 ? true : false}
        style={{ marginVertical: 50, bottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {orderDetails &&
          orderDetails.map(item => (
            <View style={[styles.itemAddedContaier]} key={item.id}>
              <ButtonIoniconsCustomizable
                useIcon={true}
                name="information-circle"
                color="skyblue"
                size={22}
                style={{ alignSelf: 'center' }}
                onPress={() => setOpenModal(true)}
              />
              {openModal && (
                <ModalOrderDetails
                  item={item?.product}
                  closeModal={setOpenModal}
                />
              )}
              <Text
                style={{
                  right: 20,
                  color: 'white',
                  fontWeight: '600'
                }}
              >
                {item.amount} - {item.product.name}
              </Text>
              <ButtonIoniconsCustomizable
                useIcon={true}
                name="trash-outline"
                size={20}
                color="red"
                style={{ position: 'absolute', right: 10 }}
                onPress={() => {
                  handleRemoveItem(item.id)
                }}
              />
            </View>
          ))}
      </ScrollView>
      {orderDetails.length > 0 && (
        <ButtonIoniconsCustomizable
          useIcon={true}
          name="send-outline"
          size={32}
          color="white"
          style={styles.sendButton}
          onPress={() => handleSendOrder()}
        />
      )}
    </View>
  )
}

export default OrderCustomizing
