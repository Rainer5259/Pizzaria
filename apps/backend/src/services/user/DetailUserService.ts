import prismaClient from '../../prisma'
import { AUTH } from '../../constants/httpStatusCode/index.json'
class DetailUserService {
  async execute(user_id: string) {
    try {
      const user = await prismaClient.user.findFirst({
        where: { id: user_id },
        select: { id: true, name: true, email: true }
      })
      if (!user_id) {
        throw new Error(AUTH.INVALID_TOKEN.MESSAGE)
      }
      return user
    } catch (e) {
      throw e
    }
  }
}

export { DetailUserService }
