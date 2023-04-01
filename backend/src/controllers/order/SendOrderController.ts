import { Request, Response } from 'express'
import { SendOrderSerivce } from '../../services/order/SendOrderSerivce'

class SendOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body

    const sendOrder = new SendOrderSerivce()

    const order = await sendOrder.execute({ order_id: order_id })

    return res.json(order)
  }
}
export { SendOrderController }
