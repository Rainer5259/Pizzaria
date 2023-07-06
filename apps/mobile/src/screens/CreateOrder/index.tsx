import React, { useEffect, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput
} from 'react-native'
import { View } from 'react-native'
import Button from '../../components/ui/Button'
import styles from './styles'
import ButtonIoniconsCustomizable from '../../components/ui/ButtonIoniconsCustomizable'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { Picker } from '@react-native-picker/picker'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../routes'
import { debounce } from 'lodash'
import { colors } from '../../components/theme'
import { api } from '../../services/api/api'
import { Order } from '../../types'

type OpenTableScreenNavigationProp = NavigationProp<
  RootStackParamList,
  'CustomizingOrder'
>

type Props = {
  navigation: OpenTableScreenNavigationProp
}

const CreateOrder: React.FC<Props> = ({ navigation }) => {
  const [tableNumber, setTableNumber] = useState<number | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [orderIsAlreadyActive, setOrderIsAlreadyActive] = useState(false)
  const [hasOrders, setHasOrders] = useState(false)
  const [showActiveOrders, setShowActiveOrders] = useState(false)
  const token = useSelector((state: RootState) => state.auth.token)

  const handleCreateNewOrder = async () => {
    try {
      if (tableNumber === 0 || tableNumber === null) {
        return Toast.show({
          type: 'error',
          text1: 'Por favor, digite o número da mesa!'
        })
      }
      if (tableNumber !== null) {
        const alreadyExistTable = orders.some(
          (item: any) => item.table === tableNumber
        )

        if (alreadyExistTable) {
          setOrderIsAlreadyActive(true)

          debounce(() => {
            return setOrderIsAlreadyActive(false)
          }, 5000)()

          Toast.show({
            type: 'info',
            text1: 'Já existe',
            text2: 'Toque aqui se deseja adicionar outros itens à esta mesa'
          })
          return
        }
        const response = await api.post(
          '/order',
          {
            table: tableNumber
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (response.data.id) {
          return navigation.navigate('CustomizingOrder', {
            order_id: response.data.id
          })
        }
      }
    } catch (e: any) {
      if (!tableNumber) {
        Toast.show({
          type: 'error',
          text1: `${'Digite o número da mesa'}`
        })
      }
      return Toast.show({
        type: 'error',
        text1: `${e.response?.data?.error}`
      })
    } finally {
      Keyboard.dismiss()
    }
  }
  const handleAddItemToExistentOrder = async () => {
    try {
      const response = await api.get('/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data) {
        const activeTable = response.data.find(
          (item: any) => item.table === tableNumber
        )
        Toast.hide()
        navigation.navigate('CustomizingOrder', { order_id: activeTable.id })
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Ocorreu um erro',
        text2: 'Mesa atual'
      })
    }
  }
  const handleCloseToast = () => {
    Toast.hide()
    setOrderIsAlreadyActive(false)
    return
  }
  const handleSeeOrdersInProgress = async () => {
    try {
      if (showActiveOrders) {
        const response = await api.get('/orders', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setOrders(response.data)
        setShowActiveOrders(state => !state)
      } else {
        return setShowActiveOrders(state => !state)
      }
    } catch (e: any) {
      if (e.response?.status === 401 && !hasOrders) {
        setHasOrders(false)
        Toast.show({
          type: 'error',
          text1: `${e.response?.data?.error || 'An error has occurred'}`
        })
      }
    }
  }
  const fetchOrderFromAPI = async () => {
    try {
      const response = await api.get('/orders', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data) {
        setOrders(response.data)
      }
    } catch (e: any) {
      if (e.response?.status === 401) {
        Toast.show({
          type: 'error',
          text1: `${e.response?.data?.message || 'An error has occurred'}`
        })
      }
    }
  }
  useEffect(() => {
    fetchOrderFromAPI()
    handleSeeOrdersInProgress()
  }, [])
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 100
        }}
      >
        <Text style={styles.title}>Novo Pedido</Text>
        <KeyboardAvoidingView behavior={Platform.OS ? 'padding' : 'height'}>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            returnKeyType="done"
            onChangeText={e => setTableNumber(parseInt(e))}
            placeholder={`${
              tableNumber !== null ? tableNumber : 'Número da Mesa'
            }`}
            placeholderTextColor={colors.placeholder}
          />
        </KeyboardAvoidingView>
        <Button
          style={styles.button}
          onPress={() => {
            handleCreateNewOrder()
          }}
        >
          <Text style={styles.buttonText}>Abrir mesa</Text>
        </Button>

        <Button
          style={[
            styles.button,
            { backgroundColor: colors.buttonBackgroundSecondary },
            !orders.length && { opacity: 0.5 }
          ]}
          onPress={() => {
            handleSeeOrdersInProgress()
          }}
          disabled={!orders.length && true}
        >
          <Text style={styles.buttonText}>{`${
            showActiveOrders ? 'Ver pedidos em andamento' : 'Ocultar lista '
          }`}</Text>
        </Button>
        {!showActiveOrders && (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-evenly'
            }}
          >
            <Picker
              style={{
                position: 'absolute',
                width: 170,
                paddingVertical: 5
              }}
              selectedValue={tableNumber}
              onValueChange={(itemValue, itemIndex) => {
                setTableNumber(itemValue)
              }}
            >
              {orders
                .slice()
                .sort((a: any, b: any) => a.table - b.table)
                .map((item: any) => (
                  <Picker.Item
                    key={item.id}
                    label={`Mesa - ${item.table}`}
                    value={item.table}
                    color="white"
                  />
                ))}
            </Picker>
          </View>
        )}
      </View>
      {orderIsAlreadyActive && (
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            alignSelf: 'center',
            bottom: 0
          }}
        >
          <ButtonIoniconsCustomizable
            useIcon={true}
            name="close"
            size={40}
            style={[styles.addMoreItemButton, { marginHorizontal: -150 }]}
            color={colors.buttonBackgroundSecondary}
            onPress={() => handleCloseToast()}
          />
          <ButtonIoniconsCustomizable
            onPress={() => {
              handleAddItemToExistentOrder()
            }}
            useIcon={true}
            name="checkmark"
            size={40}
            style={[styles.addMoreItemButton, { marginHorizontal: 0 }]}
            color={colors.buttonBackgroundPrimary}
          />
        </View>
      )}
    </View>
  )
}

export default CreateOrder
