import express from 'express'
import { CustomRequest, userExtractor } from '../utils/middleware'
import { createNewPost, getAllPosts } from '../services/postsService'
import { validateBlogPost } from '../utils/blogPostValidator'
const blogsRouter = express.Router()

blogsRouter.get('/', async (_req, res) => {
  try {
    const data = await getAllPosts()
    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json({ error: `Unable to fetch posts: ${error}` })
  }
})

blogsRouter.post('/', userExtractor, async (req: CustomRequest, res) => {
  try {
    const user = req.user
    const newBlogPost = validateBlogPost(req.body)
    if (!user) {
      return res.status(401).json({ error: 'Invalid token!' })
    }
    const blogObject = {
      ...newBlogPost,
      user: user.id,
      likedUsers: [],
      comments: [],
    }
    const addedBlog = createNewPost(blogObject)

    return res.status(200).json(addedBlog)
  } catch (error) {
    return res.status(400).json({ error: `Unable to create post: ${error}` })
  }
})

export default blogsRouter
