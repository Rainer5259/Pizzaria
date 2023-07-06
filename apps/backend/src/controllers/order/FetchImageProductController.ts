import { Request, Response } from 'express'
import { ERROR } from '../../constants/httpStatusCode/index.json'
import { FetchImageProductService } from '../../services/product/FetchImageProductService'
class FetchImageProductController {
  async handle(req: Request, res: Response) {
    try {
      const { filename } = req.params
      const fetchImageProductService =
        await new FetchImageProductService().execute({
          filename
        })
      if (!fetchImageProductService) {
        return res
          .status(ERROR.NOT_FOUND.CODE)
          .json({ error: ERROR.NOT_FOUND.MESSAGE })
      }
      return res.sendFile(fetchImageProductService)
    } catch (e) {
      return res
        .status(ERROR.NOT_FOUND.CODE)
        .json({ error: ERROR.NOT_FOUND.MESSAGE })
    }
  }
}
export { FetchImageProductController }
