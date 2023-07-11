import path from 'path'
import fs from 'fs'

interface FileNameProps {
  filename: string
}

class FetchImageProductService {
  async execute({ filename }: FileNameProps) {
    try {
      const imagePath = path.resolve(__dirname, '../../../tmp', filename)

      if (fs.existsSync(imagePath)) {
        return imagePath
      }
      throw new Error('Imagem indisponível')
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

export { FetchImageProductService }
