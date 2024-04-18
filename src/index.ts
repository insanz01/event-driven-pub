import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { initAMQP } from './config/amqp'
import { errorHandler } from './middleware'
import routes from './routes'

dotenv.config()

const PORT = process.env.PORT ?? 3008
const app = express()

app.use(cors())
app.use(express.json())

void initAMQP()

app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT} 🚀`)
})
