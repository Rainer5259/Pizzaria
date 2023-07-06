import prismaClient from '../../prisma'
import { ERROR } from '../../constants/httpStatusCode/index.json'
interface OrderRequest {
  table: number
  name: string
}
class CreateOrderService {
  async execute({ table, name }: OrderRequest) {
    try {
      const order = await prismaClient.order.create({
        data: {
          table: table,
          name: name
        }
      })
      return order
    } catch (e) {
      throw new Error(ERROR.UNAUTHORIZED.MESSAGE || e.message)
    }
  }
}
export { CreateOrderService }
