import { Request, Response } from 'express'
import {  ListProductByCategoryIDService } from '../../services/product/ListByCategoryService'

class ListProductByCategoryIDController {
  async handle(req: Request, res: Response) {
    const category_id = req.query.category_id as string

    const listByCategory = new ListProductByCategoryIDService()

    const products = await listByCategory.execute({ category_id })

    return res.json(products)
  }
}
export { ListProductByCategoryIDController }
