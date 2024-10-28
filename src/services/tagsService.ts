import Tag from '../schemas/tagSchema'

export const getAllTags = async () => {
  try {
    const data = await Tag.find()
    return data
  } catch (error) {
    throw new Error(`Unable to fetch tags! ${error}`)
  }
}
