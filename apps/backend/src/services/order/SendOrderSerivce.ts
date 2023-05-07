import prismaClient from '../../prisma'
import * as ERROR from '../../constants/internalMessages/index.json'
interface OrderRequest {
  order_id: string
}
class SendOrderSerivce {
  async execute({ order_id }: OrderRequest) {
    try {
      if (!order_id) {
        throw new Error(ERROR.INVALID_ORDER_ID.MESSAGE)
      }
      const order = await prismaClient.order.update({
        where: { id: order_id },
        data: {
          draft: true
        }
      })
      return order
    } catch (e) {
      throw new Error(e.message || 'An error has occurred')
    }
  }
}
export { SendOrderSerivce }
