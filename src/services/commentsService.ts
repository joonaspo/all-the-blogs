import Comment from '../schemas/commentSchema'
import BlogPost from '../schemas/postSchema'
import { NewCommentEntry } from '../types'

export const createNewComment = async (id: string, entry: NewCommentEntry) => {
  try {
    const commentedPost = await BlogPost.findById(id)
    if (!commentedPost) {
      throw new Error(`Blog post with id ${id} not found!`)
    }
    const commentEntry = {
      ...entry,
    }
    const newComment = new Comment(commentEntry)
    const result = await newComment.save()
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      id,
      {
        $addToSet: { comments: result.id },
      },
      { new: true, useFindAndModify: false }
    )
    return updatedBlogPost
  } catch (error) {
    throw new Error(`Error adding comment: ${error}`)
  }
}
