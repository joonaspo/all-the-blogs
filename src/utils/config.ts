import 'dotenv/config'

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

const MONGODB_URI =
  NODE_ENV === 'development'
    ? process.env.DEV_DB_URI
    : NODE_ENV === 'test'
    ? process.env.TEST_DB_URI
    : process.env.DB_URI

export { PORT, MONGODB_URI, NODE_ENV, ACCESS_TOKEN_SECRET }
