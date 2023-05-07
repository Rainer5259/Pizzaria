import prismaClient from '../../prisma'
import * as ERROR from '../../constants/internalMessages/index.json'
interface ProductRequest {
  name: string
  price: string
  description: string
  banner: string
  category_id: string
}

class CreateProductService {
  async execute({
    name,
    price,
    description,
    banner,
    category_id
  }: ProductRequest) {
    try {
      if (!category_id) {
        throw new Error(ERROR.INVALID_CATEGORY_ID.MESSAGE)
      }
      const product = await prismaClient.product.create({
        data: {
          name: name,
          price: price,
          description: description,
          banner: banner,
          category_id: category_id
        }
      })
      return product
    } catch (e) {
      throw new Error(e.message || 'An error has occurred')
    }
  }
}

export { CreateProductService }
