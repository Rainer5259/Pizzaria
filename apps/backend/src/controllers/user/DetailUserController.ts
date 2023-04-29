import { Request, Response } from 'express'
import { DetailUserService } from '../../services/user/DetailUserService'
import { AUTH } from '../../constants/httpStatusCode/index.json'
class DetailUserController {
  async handle(req: Request, res: Response) {
    const detailUserService = new DetailUserService()
    try {
      const user = await detailUserService.execute(req.user_id)
      if (!user) {
        throw new Error(AUTH.INVALID_TOKEN.MESSAGE)
      }
      return res.json(user)
    } catch (e) {
      return res.status(AUTH.INVALID_TOKEN.CODE).json({ error: e.message })
    }
  }
}
export { DetailUserController }
