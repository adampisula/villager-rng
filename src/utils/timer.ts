const timer = (millis: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(millis), millis)
  })
}

export default timer