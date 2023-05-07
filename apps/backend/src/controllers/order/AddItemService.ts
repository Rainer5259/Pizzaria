import { Request, Response } from 'express'
import { AddItemService } from '../../services/order/AddItemService'
import * as ERROR from '../../constants/internalMessages/index.json'
class AddItemController {
  async handle(req: Request, res: Response) {
    try {
      const { order_id, product_id, amount } = req.body

      const addItem = new AddItemService()

      const order = await addItem.execute({ order_id, product_id, amount })

      return res.json(order)
    } catch (e) {
      return res
        .status(ERROR.INVALID_ITEM.CODE)
        .json({ error: ERROR.INVALID_ITEM.MESSAGE })
    }
  }
}
export { AddItemController }
