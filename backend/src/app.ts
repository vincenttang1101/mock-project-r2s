import { json, urlencoded } from 'body-parser'
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import db from 'mongoose'
import { todoRoutes, userRoutes } from './routes'

const app = express()

const port = process.env.PORT || 3333
const dbUrl = process.env.DB_URL || 'undefined'

app.use(cors())

app.use(json())

app.use(urlencoded({ extended: true }))

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ message: err.message })
})

app.use('/api/users', userRoutes)
app.use('/api/todos', todoRoutes)

db.connect(dbUrl)
  .then(() => console.log('Connected DB'))
  .catch((err) => console.log(err))

app.listen(port, () => console.log(`Server started on port ${port}`))
