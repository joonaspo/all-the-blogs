import express from 'express'
import { getAllTags } from '../services/tagsService'
const tagsRouter = express.Router()

tagsRouter.get('/all', async (_req, res) => {
  try {
    const data = await getAllTags()
    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json({ error: `Unable to fetch tags: ${error}` })
  }
})

export default tagsRouter
