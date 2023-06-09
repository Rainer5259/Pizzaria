import prismaClient from '../../prisma'
import * as ERROR from '../../constants/internalMessages/index.json'
interface DetailRequest {
  order_id: string
}
class DetailOrderService {
  async execute({ order_id }: DetailRequest) {
    try {
      if (order_id === undefined) {
        throw new Error('ID is invalid')
      }

      const orders = await prismaClient.item.findMany({
        where: {
          order_id: order_id
        },
        include: {
          product: true,
          order: true
        }
      })

      return orders
    } catch (e) {
      throw new Error(ERROR.MISSING_ORDER_DETAILS.MESSAGE || e.message)
    }
  }
}
export { DetailOrderService }
