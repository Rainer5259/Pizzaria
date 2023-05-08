import prismaClient from '../../prisma'
import { ERROR } from '../../constants/httpStatusCode/index.json'
interface OrderRequest {
  order_id: string
}
class CompleteOrderService {
  async execute({ order_id }: OrderRequest) {
    try {
      if (order_id === undefined) {
        throw new Error('ID is invalid')
      }
      const order = await prismaClient.order.update({
        where: {
          id: order_id
        },
        data: { status: true }
      })
      return order
    } catch (e) {
      throw new Error(ERROR.UNPROCESSABLE_ENTITY.MESSAGE || e.message)
    }
  }
}
export { CompleteOrderService }
