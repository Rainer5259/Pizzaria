import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import prismaClient from '../../prisma'
import { AUTH } from '../../constants/httpStatusCode/index.json'
interface AuthRequest {
  email: string
  password: string
}
class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    try {
      const user = await prismaClient.user.findFirst({
        where: { email: email }
      })
      if (!user) {
        throw new Error(AUTH.INVALID_CREDENTIALS.MESSAGE)
      }
      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch) {
        throw new Error(AUTH.INVALID_CREDENTIALS.MESSAGE)
      }

      const token = sign(
        {
          name: user.name,
          email: user.email
        },
        process.env.JWT_SECRET_KEY,
        {
          subject: user.id,
          expiresIn: '30d'
        }
      )

      return { id: user.id, name: user.name, email: user.email, token: token }
    } catch (e) {
      throw e
    }
  }
}

export { AuthUserService }
