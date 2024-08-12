import BlogPost from '../schemas/postSchema'
import Tag from '../schemas/tagSchema'
import { NewPostEntry } from '../types'

export const getAllPosts = async () => {
  try {
    const data = await BlogPost.find().populate('user tags')
    return data
  } catch (error) {
    throw new Error(`Unable to fetch posts! ${error}`)
  }
}

const saveTags = async (tags: string[]) => {
  const tagIds: string[] = []

  for (const tag of tags) {
    try {
      let existingTag = await Tag.findOne({ content: tag })
      if (!existingTag) {
        const newTag = new Tag({ content: tag })
        await newTag.save()
        existingTag = newTag
      }
      tagIds.push(existingTag._id.toString())
    } catch (error) {
      console.log(`Error processing tag '${tag}': ${error}`)
    }
  }
  return tagIds
}

export const createNewPost = async (entry: NewPostEntry) => {
  try {
    const tags = await saveTags(entry.tags)
    const newEntry = {
      ...entry,
      tags: tags,
    }
    const newBlogPost = new BlogPost(newEntry)
    await newBlogPost.save()
  } catch (error) {
    throw new Error(`Error saving new blog post: ${error}!`)
  }
}

export const getPostById = async (id: string) => {
  try {
    const blogPost = await BlogPost.findById(id).populate(
      'user tags comments likedUsers'
    )
    return blogPost
  } catch (error) {
    throw new Error(`Error fetching blog post: ${error}!`)
  }
}

export const addUserToLikedUsers = async (blogId: string, userId: string) => {
  try {
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      blogId,
      { $addToSet: { likedUsers: userId } },
      { new: true, useFindAndModify: false }
    )
    return updatedBlogPost
  } catch (error) {
    throw new Error(`Error liking the blog post: ${error}!`)
  }
}
