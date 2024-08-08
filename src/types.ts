export interface User {
  id: string
  username: string
  displayName: string
  passwordHash: string
  dateOfBirth: string
  dateOfRegistration: string
  madePosts?: Post[]
  followedUsers?: nonSensitiveUser[]
}

export interface Post {
  id: string
  title: string
  description: string
  author: string
  url: string
  user: nonSensitiveUser
  tags: Tag[]
  likedUsers?: nonSensitiveUser[]
  comments?: Comment[]
}

export interface Comment {
  content: string
  user: nonSensitiveUser
  date: string
}

export interface Tag {
  id: string
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
