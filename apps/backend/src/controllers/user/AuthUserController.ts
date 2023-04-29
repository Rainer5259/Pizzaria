import { Request, Response } from 'express'
import { AuthUserService } from '../../services/user/AuthUserService'
import { AUTH } from '../../constants/httpStatusCode/index.json'
class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body
    const authUserService = new AuthUserService()
    try {
      const auth = await authUserService.execute({ email, password })
      return res.json(auth)
    } catch (e) {
      return res.status(AUTH.UNAUTHENTICATED.CODE).json({ error: e.message })
    }
  }
}
export { AuthUserController }
