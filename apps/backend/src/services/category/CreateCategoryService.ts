import prismaClient from '../../prisma'
import { USER_INPUT } from '../../constants/httpStatusCode/index.json'
import { CATEGORIES } from '../../constants/catogeryItems/index.json'
import {
  INVALID_CATEGORY_NAME,
  INVALID_CATEGORY_ALREADY_EXIST
} from '../../constants/internalMessages/index.json'
interface CategoryRequest {
  name: string
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    if (name === '') {
      throw new Error(USER_INPUT.MISSING_REQUIRED_FIELDS.MESSAGE)
    }
    try {
      const categoryIsValid = CATEGORIES.toLocaleString()
        .toLowerCase()
        .includes(name.toLowerCase())
      if (!categoryIsValid) {
        throw new Error(INVALID_CATEGORY_NAME.MESSAGE)
      }

      const categoryAlreadyExists = await prismaClient.category.findMany({
        select: { name: true }
      })
      categoryAlreadyExists.map(e => {
        if (e.name.toUpperCase() === name.toUpperCase()) {
          throw new Error(INVALID_CATEGORY_ALREADY_EXIST.MESSAGE)
        }
      })

      const category = await prismaClient.category.create({
        data: { name: name.toUpperCase() },
        select: { id: true, name: true }
      })
      return category
    } catch (e) {
      throw e
    }
  }
}

export { CreateCategoryService }
