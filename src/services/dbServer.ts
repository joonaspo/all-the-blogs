import mongoose from 'mongoose'
import { MONGODB_URI } from '../utils/config'
import { logError, logInfo } from '../utils/logger'

mongoose.set('strictQuery', false)

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI as string)
    logInfo('Successfully connected to the DB')
  } catch (error) {
    logError('Error connecting to the DB', error as string)
  }
}

export default connectToDB
