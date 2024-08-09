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
      // Check if the tag already exists
      let existingTag = await Tag.findOne({ content: tag })
      if (!existingTag) {
        // Create and save the new tag if it doesn't exist
        const newTag = new Tag({ content: tag })
        await newTag.save()
        existingTag = newTag
      }
      // Add the tag's ID to the list
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
    console.log(newEntry)
    const newBlogPost = new BlogPost(newEntry)
    console.log(newBlogPost)
    await newBlogPost.save()
  } catch (error) {
    throw new Error(`Error saving new blog post: ${error}!`)
  }
}
