import mongoose from 'mongoose'
import Tag from './tagSchema'
import User from './userSchema'
import Comment from './commentSchema'

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true,
  },
  description: { type: String, required: true, minLength: 5 },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Tag,
    },
  ],
  likedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Comment,
    },
  ],
})

PostSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const BlogPost = mongoose.model('Post', PostSchema, 'posts')

export default BlogPost
