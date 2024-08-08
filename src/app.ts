import express from 'express'
const app = express()
import cors from 'cors'
import utilRouter from './routes/utilRouter'
import connectToDB from './services/dbServer'
import usersRouter from './routes/users'

connectToDB()

app.use(express.json())
app.use(cors())

app.use('/api', utilRouter)
app.use('/api', usersRouter)
export default app
