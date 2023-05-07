import { Request, Response } from 'express'
import { SendOrderSerivce } from '../../services/order/SendOrderSerivce'
import { ERROR } from '../../constants/httpStatusCode/index.json'
class SendOrderController {
  async handle(req: Request, res: Response) {
    try {
      const { order_id } = req.body

      const sendOrder = new SendOrderSerivce()

      const order = await sendOrder.execute({ order_id: order_id })
      return res.json(order)
    } catch (e) {
      return res
        .status(ERROR.UNPROCESSABLE_ENTITY.CODE)
        .json({ error: ERROR.UNPROCESSABLE_ENTITY.MESSAGE })
    }
  }
}
export { SendOrderController }
