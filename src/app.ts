import express from 'express'
const app = express()
import cors from 'cors'
import utilRouter from './routes/utilRouter'

app.use(express.json())
app.use(cors())

app.use('/api', utilRouter)

export default app
