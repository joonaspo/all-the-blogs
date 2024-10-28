import { ToNewCommentEntry, toNewPostEntry } from '../types'
import {
  parseAuthor,
  parseDate,
  parseDescription,
  parseTags,
  parseTitle,
  parseUrl,
  parseDisplayName,
  parsePassword,
  parseUsername,
} from './parsers'
import { newUser } from '../types'
import { z } from 'zod'

export const validateBlogPost = (blogObject: unknown): toNewPostEntry => {
  if (!blogObject || typeof blogObject !== 'object') {
    throw new Error('Incorrect or missing data')
  }
  if (
    'title' in blogObject &&
    'description' in blogObject &&
    'author' in blogObject &&
    'url' in blogObject &&
    'tags' in blogObject &&
    'date' in blogObject
  ) {
    const newBlogEntry: toNewPostEntry = {
      title: parseTitle(blogObject.title),
      description: parseDescription(blogObject.description),
      url: parseUrl(blogObject.url),
      author: parseAuthor(blogObject.author),
      tags: parseTags(blogObject.tags),
      date: parseDate(blogObject.date),
    }
    return newBlogEntry
  }
  throw new Error('Incorrect data: missing fields!')
}

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
      displayName: parseDisplayName(user.displayName),
      password: parsePassword(user.password),
      dateOfBirth: parseDate(user.dateOfBirth),
      dateOfRegistration: parseDate(user.dateOfRegistration),
    }
    return newEntry
  }
  throw new Error('Incorrect data: missing fields!')
}

export const validateComment = (object: unknown): ToNewCommentEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }
  if ('content' in object && 'date' in object) {
    const newEntry: ToNewCommentEntry = {
      content: z.string().parse(object.content),
      date: z.date().parse(object.date),
    }
    return newEntry
  }
  throw new Error('Incorrect data: missing fields!')
}
