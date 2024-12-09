import bcryptjs from 'bcryptjs'
import express from 'express'
import User from '../schemas/userSchema'
import { CustomRequest, userExtractor } from '../utils/middleware'
import { validateUser } from '../utils/validators'
const usersRouter = express.Router()

usersRouter.post('/signup', async (req, res) => {
  try {
    const rawUserObject = {
      ...req.body,
      dateOfRegistration: new Date().toISOString().slice(0, 10),
    }
    const user = validateUser(rawUserObject)
    const passwordHash = await bcryptjs.hash(user.password, 10)

    const newUser = new User({
      username: user.username,
      displayName: user.displayName,
      passwordHash,
      dateOfBirth: user.dateOfBirth,
      dateOfRegistration: user.dateOfRegistration,
    })

    const savedUser = await newUser.save()

    return res.status(201).json(savedUser)
  } catch (error: unknown) {
    let errorMessage = ''
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message
    }
    return res.status(500).json(errorMessage)
  }
})

usersRouter.patch('/change', userExtractor, async (req: CustomRequest, res) => {
  try {
    const user = req.user
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
    let errorMessage = ''
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message
    }
    return res.status(500).json(errorMessage)
  }
})

usersRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

      .select('username displayName dateOfRegistration')
      .populate({ path: 'madePosts', select: 'title' })
    return res.status(200).json(user)
  } catch (error) {
    let errorMessage = ''
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message
    }
    return res.status(500).json(errorMessage)
  }
})

export default usersRouter
