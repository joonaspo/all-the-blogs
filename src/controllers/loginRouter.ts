import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../schemas/userSchema'
import express from 'express'
import { ACCESS_TOKEN_SECRET } from '../utils/config'
const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    const checkPassword =
      user === null
        ? false
        : await bcryptjs.compare(password, user.passwordHash)

    if (!(user && checkPassword)) {
      const errorMessage = 'Invalid username or password!'
      return res.status(401).json(errorMessage)
    }

    const token = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET as string, {
      expiresIn: '7d',
    })

    return res.status(200).send({
      token,
      id: user.id,
      username: user.username,
      displayName: user.displayName,
    })
  } catch (error: unknown) {
    let errorMessage = ''
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message
    }
    return res.status(500).json(errorMessage)
  }
})

export default loginRouter
