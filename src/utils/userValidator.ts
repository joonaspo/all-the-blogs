import { newUser } from '../types'
import {
  parseDate,
  parseDisplayName,
  parsePassword,
  parseUsername,
} from './parsers'

export const validateUser = (user: unknown): newUser => {
  if (!user || typeof user !== 'object') {
    throw new Error('Incorrect or missing data')
  }
  if (
    'username' in user &&
    'password' in user &&
    'displayName' in user &&
    'dateOfBirth' in user &&
    'dateOfRegistration' in user
  ) {
    const newEntry: newUser = {
      username: parseUsername(user.username),
      password: parsePassword(user.password),
      displayName: parseDisplayName(user.displayName),
      dateOfBirth: parseDate(user.dateOfBirth),
      dateOfRegistration: parseDate(user.dateOfRegistration),
    }
    return newEntry
  }
  throw new Error('Incorrect data: missing fields!')
}
