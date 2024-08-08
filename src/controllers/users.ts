import bcryptjs from 'bcryptjs'
import express from 'express'
import User from '../schemas/userSchema'
import { validateUser } from '../utils/userValidator'
import { CustomRequest, userExtractor } from '../utils/middleware'
const usersRouter = express.Router()

usersRouter.post('/signup', async (req, res) => {
  try {
    const user = validateUser(req.body)
    const passwordHash = await bcryptjs.hash(user.password, 10)

    const newUser = new User({
      username: user.username,
      passwordHash,
      displayName: user.displayName,
      dateOfBirth: user.dateOfBirth,
      dateOfRegistration: user.dateOfRegistration,
    })
    const savedUser = await newUser.save()
    res.status(201).json({ savedUser })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

usersRouter.patch('/change', userExtractor, async (req: CustomRequest, res) => {
  const user = req.user
  try {
    const { newPassword } = req.body
    if (!newPassword) {
      return res.status(400).json({ error: 'Password is required' })
    }

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized!' })
    }

    const passwordHash = await bcryptjs.hash(newPassword, 10)
    await User.findByIdAndUpdate(user.id, { passwordHash: passwordHash })

    return res.status(200).json({ message: 'Successfully changed password!' })
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Unable to change password: ${error}!` })
  }
})

export default usersRouter
