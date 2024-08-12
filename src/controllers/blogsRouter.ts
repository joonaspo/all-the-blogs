import express from 'express'
import { CustomRequest, userExtractor } from '../utils/middleware'
import {
  addUserToLikedUsers,
  createNewPost,
  deleteBlog,
  getAllPosts,
  getPostById,
  searchBlogsByTags,
} from '../services/postsService'
import { validateBlogPost } from '../utils/blogPostValidator'
const blogsRouter = express.Router()

blogsRouter.get('/searchTags', async (req, res) => {
  try {
    const searchParams = req.query.tags as string | string[]
    const result = await searchBlogsByTags(searchParams)
    return res.status(200).json(result)
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Error searching for posts: ${error}` })
  }
})

blogsRouter.get('/all', async (_req, res) => {
  try {
    const data = await getAllPosts()
    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json({ error: `Unable to fetch posts: ${error}` })
  }
})

blogsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = await getPostById(id)
    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json({ error: `Unable to fetch post: ${error}` })
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
    console.log(newBlogPost)
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
  } catch (error) {
    return res.status(400).json({ error: `Unable to create post: ${error}` })
  }
})

blogsRouter.patch('/:id', userExtractor, async (req: CustomRequest, res) => {
  try {
    const user = req.user
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
