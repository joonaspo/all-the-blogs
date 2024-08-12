export interface User {
  save(): unknown
  id: string
  username: string
  displayName: string
  passwordHash: string
  dateOfBirth: string
  dateOfRegistration: string
  madePosts?: Post[]
  followedUsers?: nonSensitiveUser[]
}

export interface NewPostEntry {
  title: string
  description: string
  author: string
  url: string
  tags: string[]
  user: string
  likedUsers?: string[]
  comments?: string[]
  date: string
}

export interface Post {
  id: string
  title: string
  description: string
  author: string
  url: string
  user: nonSensitiveUser
  tags: SearchTag[]
  likedUsers?: nonSensitiveUser[]
  comments?: Comment[]
}

export interface Comment {
  content: string
  user: nonSensitiveUser
  date: string
}

export interface SearchTag {
  _id: string
  content: string
}

export interface newUser {
  username: string
  displayName: string
  password: string
  dateOfBirth: string
  dateOfRegistration: string
}

export type nonSensitiveUser = Omit<User, 'passwordHash' | 'dateOfBirth'>

export type NewTagEntry = Omit<SearchTag, 'id'>

export type toNewPostEntry = Omit<
  NewPostEntry,
  'user' | 'comments' | 'likedUsers'
>
