import { Types } from 'mongoose'
import BlogPost from '../schemas/postSchema'
import Tag from '../schemas/tagSchema'
import { NewPostEntry, BaseUser } from '../types'

const saveTags = async (tagsParams: string[]) => {
  const tagIds: string[] = []
  const tags = tagsParams.map((tag) => tag.toLowerCase())
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
      throw new Error(`Error processing tag '${tag}': ${error}`)
    }
  }
  return tagIds
}

export const createNewPost = async (entry: NewPostEntry, user: BaseUser) => {
  try {
    const tags = await saveTags(entry.tags)
    const newEntry = {
      ...entry,
      tags: tags,
    }
    const newBlogPost = new BlogPost(newEntry)
    const result = await newBlogPost.save()
    user.madePosts = user.madePosts?.concat(result.id)
    await user.save()
    return result
  } catch (error) {
    throw new Error(`Error saving new blog post: ${error}!`)
  }
}

export const getPostById = async (id: string) => {
  try {
    const result = await BlogPost.findById(id).populate(
      'user tags comments likedUsers'
    )
    return result
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

export const getBlogs = async (tagParams: string | string[]) => {
  try {
    const tagsArray: string[] = Array.isArray(tagParams)
      ? tagParams
      : [tagParams]

    if (!tagParams) {
      const data = await BlogPost.find()
        .populate({ path: 'user', select: 'username displayName' })
        .populate('tags')
      return data
    } else {
      const tags = tagsArray.map((tag) => tag.toLowerCase())
      const tagDocuments = await Tag.find({ content: { $in: tags } })
      const tagIds: Types.ObjectId[] = tagDocuments.map((tag) => tag._id)

      const data = await BlogPost.find({ tags: { $in: tagIds } })
        .populate({ path: 'user', select: 'username displayName' })
        .populate('tags')
      return data
    }
  } catch (error) {
    throw new Error(`Error searching with tags: ${error}!`)
  }
}

export const deleteBlog = async (blogId: string, user: BaseUser) => {
  try {
    const blog = await BlogPost.findById(blogId)
    if (!blog) {
      throw new Error('Blog not found!')
    }
    if (blog.user?.toString() === user.id) {
      const deletedBlog = await BlogPost.findByIdAndDelete(blogId)
      user.madePosts = user.madePosts?.filter(
        (id) => id.toString() !== blogId.toString()
      )
      await user.save()
      return deletedBlog
    }
    throw new Error('Unauthorized: Cannot delete blog post.')
  } catch (error) {
    throw new Error(`Error deleting the blog: ${error}!`)
  }
}
