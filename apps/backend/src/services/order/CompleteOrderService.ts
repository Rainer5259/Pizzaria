import prismaClient from '../../prisma'

interface OrderRequest {
  order_id: string
}
class CompleteOrderService {
  async execute({ order_id }: OrderRequest) {
    const order = await prismaClient.order.update({
      where: {
        id: order_id
      },
      data: { status: true }
    })
    return order
  }
}
export { CompleteOrderService }
