import { Request, Response } from 'express'
import { CreateCategoryService } from '../../services/category/CreateCategoryService'
import { ERROR } from '../../constants/httpStatusCode/index.json'
class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name } = req.body
    const createCategoryService = new CreateCategoryService()

    try {
      const category = await createCategoryService.execute({ name })

      return res.json(category)
    } catch (e) {
      return res
        .status(ERROR.UNPROCESSABLE_ENTITY.CODE)
        .json({ error: e.message })
    }
  }
}

export { CreateCategoryController }
