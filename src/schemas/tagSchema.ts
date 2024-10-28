import mongoose from 'mongoose'

const TagSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
})

TagSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Tag = mongoose.model('Tag', TagSchema, 'tags')

export default Tag
