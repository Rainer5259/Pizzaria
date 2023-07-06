import express, { Request, Response, NextFunction } from 'express'
import { router } from '../routes'
import 'express-async-errors'
import cors from 'cors'
import path from 'path'

const app = express()

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self', style-src 'self'; img-src 'self' data:; font-src 'self'"
  )
  next()
})

app.use(express.json())

app.use(cors())

// app.get('/images/product/:filename', (req, res) => {
//   const { filename } = req.params
//   const imagePath = path.resolve(__dirname, '../../tmp', filename)

//   res.sendFile(imagePath)
// })

app.use(router)

app.use('/files', express.static(path.resolve(__dirname, '..', '..', 'tmp')))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message })
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})
app.listen(3333, () => {
  console.log('Server Online!!!')
})
