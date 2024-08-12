import { toNewPostEntry } from '../types'
import {
  parseAuthor,
  parseDate,
  parseDescription,
  parseTags,
  parseTitle,
  parseUrl,
} from './parsers'

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