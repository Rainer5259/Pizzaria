import { Request, Response } from 'express'
import { CreateOrderService } from '../../services/order/CreateOrderService'
import { ERROR } from '../../constants/httpStatusCode/index.json'
class CreateOrderController {
  async handle(req: Request, res: Response) {
    try {
      const { table, name } = req.body

      const createOrderService = new CreateOrderService()

      const order = await createOrderService.execute({ table, name })

      return res.json(order)
    } catch (e) {
      return res
        .status(ERROR.UNPROCESSABLE_ENTITY.CODE)
        .json({ error: ERROR.UNPROCESSABLE_ENTITY.MESSAGE })
    }
  }
}
export { CreateOrderController }
