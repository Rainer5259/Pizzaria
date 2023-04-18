import prismaClient from "../../prisma";

interface CategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    if (name === '') {
      throw new Error("User need a name")
    }
    const category = await prismaClient.category.create({
      data: { name: name },
      select: { id: true, name: true }
    })
    return category
  }
}

export { CreateCategoryService }