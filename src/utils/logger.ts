const logInfo = (...params: unknown[]) => {
  console.log(...params)
}

const logError = (...params: unknown[]) => {
  console.error(...params)
}

export { logInfo, logError }
