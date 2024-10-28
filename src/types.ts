export interface BaseUser {
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

export interface ToNewCommentEntry {
  content: string
  date: Date
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

export type nonSensitiveUser = Omit<BaseUser, 'passwordHash' | 'dateOfBirth'>

export type NewTagEntry = Omit<SearchTag, 'id'>

export type toNewPostEntry = Omit<
  NewPostEntry,
  'user' | 'comments' | 'likedUsers'
>

export interface Comment extends ToNewCommentEntry {
  id: string
  user: nonSensitiveUser
}

export interface NewCommentEntry extends ToNewCommentEntry {
  user: string
}
