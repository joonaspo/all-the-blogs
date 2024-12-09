import express from 'express'
const app = express()
import cors from 'cors'
import utilRouter from './controllers/utilRouter'
import connectToDB from './services/dbServer'
import usersRouter from './controllers/usersRouter'
import loginRouter from './controllers/loginRouter'
import { tokenExtractor } from './utils/middleware'
import blogsRouter from './controllers/blogsRouter'
import tagsRouter from './controllers/tagsRouter'
import cookieParser from 'cookie-parser'
import commentsRouter from './controllers/commentsRouter'

connectToDB()

app.use(express.json())
app.use(cors())
app.use(tokenExtractor)
app.use(cookieParser())

app.use('/api/utils', utilRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/posts', blogsRouter)
app.use('/api/tags', tagsRouter)
app.use('/api/comments', commentsRouter)

export default app
