import express from 'express'
import { CustomRequest, userExtractor } from '../utils/middleware'
import {
  addUserToLikedUsers,
  createNewPost,
  deleteBlog,
  getBlogs,
  getPostById,
} from '../services/postsService'
import { validateBlogPost } from '../utils/validators'
const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
  try {
    const searchParams = req.query.tag as string | string[]
    const data = await getBlogs(searchParams)
    return res.status(200).json(data)
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Error searching for posts: ${error}` })
  }
})

blogsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = await getPostById(id)
    if (!data) {
      return res.status(404).json({ error: `Post not found!` })
    }
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: `Unable to fetch post: ${error}` })
  }
})

blogsRouter.post('/', userExtractor, async (req: CustomRequest, res) => {
  try {
    const user = req.user
    const rawBlogObject = {
      ...req.body,
      date: new Date().toISOString().slice(0, 10),
    }
    const newBlogPost = validateBlogPost(rawBlogObject)

    if (!user) {
      return res.status(401).json({ error: 'Invalid token!' })
    }
    const blogObject = {
      ...newBlogPost,
      user: user.id,
      likedUsers: [],
      comments: [],
    }
    const addedBlog = await createNewPost(blogObject, user)
    return res.status(201).json(addedBlog)
  } catch (error: unknown) {
    let errorMessage = ''
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message
    }
    return res.status(400).json(errorMessage)
  }
})

blogsRouter.patch('/:id', userExtractor, async (req: CustomRequest, res) => {
  try {
    const user = req.user
    console.log(user)
    if (!user) {
      return res.status(401).json({ error: 'Invalid token!' })
    }
    const blogId = req.params.id
    const userId = user.id
    if (!blogId) {
      throw new Error('ID is required!')
    }
    if (!userId) {
      throw new Error('User ID is required!')
    }
    const likedPost = await addUserToLikedUsers(blogId, userId)
    return res.status(200).json(likedPost)
  } catch (error) {
    return res.status(400).json({ error: `Error liking the post: ${error}` })
  }
})

blogsRouter.delete('/:id', userExtractor, async (req: CustomRequest, res) => {
  try {
    const user = req.user
    const { id } = req.params
    if (!user) {
      return res.status(401).json({ error: 'Invalid token!' })
    }
    await deleteBlog(id, user)
    return res.status(204).end()
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Unable to delete the post: ${error}` })
  }
})

export default blogsRouter
