import express from 'express'
const app = express()
import cors from 'cors'
import utilRouter from './controllers/utilRouter'
import connectToDB from './services/dbServer'
import usersRouter from './controllers/users'
import loginRouter from './controllers/loginRouter'
import { tokenExtractor } from './utils/middleware'

connectToDB()

app.use(express.json())
app.use(cors())
app.use(tokenExtractor)

app.use('/api', utilRouter)
app.use('/api', usersRouter)
app.use('/api', loginRouter)

export default app
