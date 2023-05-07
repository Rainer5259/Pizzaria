import { Request, Response } from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'
import { USER_INPUT, ERROR } from '../../constants/httpStatusCode/index.json'

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body

    try {
      const createUserService = new CreateUserService()
      const validateEmailFormat = /\S+@\S+\.\S+/
      if (!validateEmailFormat.test(email)) {
        throw new Error(USER_INPUT.INVALID_EMAIL.MESSAGE)
      }
      const user = await createUserService.execute({ name, email, password })
      return res.json(user)
    } catch (e) {
      return res
        .status(ERROR.UNPROCESSABLE_ENTITY.CODE)
        .json({ error: e.message })
    }
  }
}

export { CreateUserController }
