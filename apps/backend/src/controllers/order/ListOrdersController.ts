import { Request, Response } from 'express'
import { ListOrdersService } from '../../services/order/ListOrdersService'
import { ERROR } from '../../constants/httpStatusCode/index.json'
class ListOrdersController {
  async handle(req: Request, res: Response) {
    try {
      const listOrdersService = new ListOrdersService()
      const orders = await listOrdersService.execute()
      return res.json(orders)
    } catch (e) {
      throw res
        .json(ERROR.SERVICE_UNAVAILABLE.MESSAGE)
        .status(ERROR.SERVICE_UNAVAILABLE.CODE)
    }
  }
}
export { ListOrdersController }
