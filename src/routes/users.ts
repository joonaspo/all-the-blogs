import bcryptjs from 'bcryptjs'
import express from 'express'
import User from '../schemas/userSchema'
import { validateUser } from '../utils/userValidator'
const usersRouter = express.Router()

usersRouter.post('/signup', async (req, res) => {
  try {
    const user = validateUser(req.body)
    console.log(user)
    const passwordHash = await bcryptjs.hash(user.password, 10)

    const newUser = new User({
      username: user.username,
      passwordHash,
      displayName: user.displayName,
      dateOfBirth: user.dateOfBirth,
      dateOfRegistration: user.dateOfRegistration,
    })
    await newUser.save()
    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default usersRouter
