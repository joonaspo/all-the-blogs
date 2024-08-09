import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../schemas/userSchema'
import express from 'express'
import { SECRET } from '../utils/config'
const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  const checkPassword =
    user === null ? false : await bcryptjs.compare(password, user.passwordHash)

  if (!(user && checkPassword)) {
    return res.status(401).json({ error: 'Invalid username or password!' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, SECRET as string)
  return res
    .status(200)
    .send({ token, username: user.username, displayName: user.displayName })
})

export default loginRouter
