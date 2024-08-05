const logInfo = (...params: string[]) => {
  console.log(...params)
}

const logError = (...params: string[]) => {
  console.error(...params)
}

export { logInfo, logError }
