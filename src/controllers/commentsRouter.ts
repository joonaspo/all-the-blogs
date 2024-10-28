import express from 'express'
import { CustomRequest, userExtractor } from '../utils/middleware'
import { validateComment } from '../utils/validators'
import { createNewComment } from '../services/commentsService'

const commentsRouter = express.Router()

commentsRouter.post(
  '/:id/new',
  userExtractor,
  async (req: CustomRequest, res) => {
    try {
      const user = req.user
      if (!user) {
        return res.status(401).json({ error: 'Invalid token!' })
      }
      const { id } = req.params
      const commentObject = {
        ...req.body,
        date: new Date(),
      }
      const newComment = validateComment(commentObject)
      const comment = {
        ...newComment,
        user: user.id,
      }
      const addedComment = await createNewComment(id, comment)
      return res.status(201).json(addedComment)
    } catch (error) {
      let errorMessage = ''
      if (error instanceof Error) {
        errorMessage = 'Error: ' + error.message
      }
      return res.status(400).json(errorMessage)
    }
  }
)

export default commentsRouter
