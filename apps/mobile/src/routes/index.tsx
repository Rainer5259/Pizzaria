import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreateOrder from '../screens/CreateOrder'
import OrderCustomizing from '../screens/OrderCustomizing'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../screens/Login'

export type RootStackParamList = {
  Login: undefined
  CreateOrder: undefined
  OrderCustomizing: { order_id: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const AppRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateOrder"
          component={CreateOrder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderCustomizing"
          component={OrderCustomizing}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppRoutes
