import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minLength: 1,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
  },
})

commentSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
