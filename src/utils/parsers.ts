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
  if (!isString(displayName)) {
    throw new Error('Incorrect or missing display name')
  }
  return displayName
}

export const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth')
  }
  return dateOfBirth
}

export const parseDateOfRegistration = (
  dateOfRegistration: unknown
): string => {
  if (!isString(dateOfRegistration) || !isDate(dateOfRegistration)) {
    throw new Error('Incorrect or missing date of registration')
  }
  return dateOfRegistration
}
