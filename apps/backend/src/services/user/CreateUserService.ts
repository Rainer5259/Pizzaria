import { hash } from 'bcryptjs'
import prismaClient from '../../prisma'
import { USER_INPUT, ERROR } from '../../constants/httpStatusCode/index.json'
interface UserRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!email) {
      throw new Error(USER_INPUT.INVALID_EMAIL.MESSAGE)
    }
    try {
      const userAlreadyExists = await prismaClient.user.findFirst({
        where: { email: email }
      })

      if (userAlreadyExists) {
        throw new Error(ERROR.USER_ALREADY_EXISTS.MESSAGE)
      }

      const passwordHash = await hash(password, 8)

      const user = await prismaClient.user.create({
        data: {
          name: name,
          email: email,
          password: passwordHash
        },
        select: {
          id: true,
          name: true,
          email: true
        }
      })
      return user
    } catch (e) {
      throw e
    }
  }
}

export { CreateUserService }
