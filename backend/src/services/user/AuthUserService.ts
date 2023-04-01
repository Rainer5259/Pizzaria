import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
interface AuthRequest {
  email: string;
  password: string;

}
class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({ where: { email: email } })
    if (!user) {
      throw new Error("User/Password incorrect")
    }
    const passwordMatch = await compare(password, user.password)

    console.log(passwordMatch)
    if (!passwordMatch) {
      throw new Error("User/Password incorrect")
    }

    const token = sign({
      name: user.name,
      email: user.email,
    },
      process.env.JWT_SECRET_KEY,
      {
        subject: user.id,
        expiresIn: '30d',

      }
    )

    return { id: user.id, name: user.name, email: user.email, token: token }
  }
}

export { AuthUserService }