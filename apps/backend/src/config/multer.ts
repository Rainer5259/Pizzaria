import crypto from 'crypto'
import multer from 'multer'
import { extname, resolve } from 'path'

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(8).toString('hex')
          const fileExtension = extname(file.originalname)
          const fileName = `${fileHash}${fileExtension}`
          return callback(null, fileName)
        }
      })
    }
  }
}
