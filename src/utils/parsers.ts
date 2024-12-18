const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

export const parseUsername = (username: unknown): string => {
  if (!isString(username) || username.length < 3) {
    throw new Error(
      'Incorrect or missing username! Username must be at least 3 characters long.'
    )
  }
  return username
}

export const parsePassword = (password: unknown): string => {
  if (!isString(password) || password.length < 6) {
    throw new Error(
      'Incorrect or missing password! Password must be at least 6 characters long.'
    )
  }
  return password
}

export const parseDisplayName = (displayName: unknown): string => {
  if (!isString(displayName) || displayName.length < 3) {
    throw new Error(
      'Incorrect or missing display name! Display name must be at least 3 characters long.'
    )
  }
  return displayName
}

export const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date' + date)
  }
  return date
}

export const parseTitle = (title: unknown): string => {
  if (!isString(title) || title.length < 5) {
    throw new Error(
      'Incorrect or missing title! Title must be at least 5 characters long.'
    )
  }
  return title
}

export const parseDescription = (desc: unknown): string => {
  if (!isString(desc) || desc.length < 5) {
    throw new Error(
      'Incorrect or missing description! Description must be at least 5 characters long.'
    )
  }
  return desc
}

export const parseUrl = (url: unknown): string => {
  const urlPattern =
    // eslint-disable-next-line no-useless-escape
    /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?$/i

  if (!isString(url) || !urlPattern.test(url)) {
    throw new Error('Incorrect or missing URL! URL must be a valid format.')
  }
  return url
}

export const parseAuthor = (author: unknown): string => {
  if (!isString(author) || author.length < 5) {
    throw new Error(
      'Incorrect or missing author! Author must be at least 5 characters long.'
    )
  }
  return author
}

export const parseTags = (tags: unknown): string[] => {
  const isArrayOfStrings = (value: unknown): value is string[] =>
    Array.isArray(value) && value.every(isString)

  if (!isArrayOfStrings(tags)) {
    throw new Error('Tags must be an array of strings.')
  }

  if (tags.length < 1) {
    throw new Error('Enter at least one tag.')
  }

  tags.forEach((tag: string) => {
    if (tag.length < 3) {
      throw new Error(
        'Incorrect or missing tag! Tag must be at least 3 characters long.'
      )
    }
  })
  return tags
}
