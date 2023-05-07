import { Request, Response } from 'express'
import { DetailOrderService } from '../../services/order/DetailOrderService'
import { ERROR } from '../../constants/httpStatusCode/index.json'
class DetailOrderController {
  async handle(req: Request, res: Response) {
    try {
      const order_id = req.body.order_id as string
      const detailOrderService = new DetailOrderService()

      const orders = await detailOrderService.execute({ order_id })
      return res.json(orders)
    } catch (e) {
      throw new Error(ERROR.UNPROCESSABLE_ENTITY.MESSAGE)
      return res
        .status(ERROR.UNPROCESSABLE_ENTITY.CODE)
        .json({ error: ERROR.UNPROCESSABLE_ENTITY.MESSAGE })
    }
  }
}
export { DetailOrderController }
