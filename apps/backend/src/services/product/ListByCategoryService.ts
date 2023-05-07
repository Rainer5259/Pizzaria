import prismaClient from '../../prisma'
import * as ERROR from '../../constants/internalMessages/index.json'
interface ProductRequest {
  category_id: string
}
class ListByCategoryService {
  async execute({ category_id }: ProductRequest) {
    try {
      if (!category_id) {
        throw new Error(ERROR.INVALID_CATEGORY_ID.MESSAGE)
      }
      const findByCategory = await prismaClient.product.findMany({
        where: { category_id: category_id },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          category: true
        }
      })
      return findByCategory
    } catch (e) {
      throw new Error(e.message || 'An error has occurred')
    }
  }
}

export { ListByCategoryService }
