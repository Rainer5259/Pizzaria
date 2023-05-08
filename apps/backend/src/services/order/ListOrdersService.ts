import prismaClient from '../../prisma'

class ListOrdersService {
  async execute() {
    try {
      const orders = await prismaClient.order.findMany({
        where: { draft: false, status: false },
        orderBy: { create_at: 'desc' }
      })

      return orders
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
export { ListOrdersService }
