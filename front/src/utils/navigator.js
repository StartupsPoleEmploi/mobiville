export const getPosition = () => new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('no permissions'))
  }, 10000)
  navigator.geolocation.getCurrentPosition((result) => {
    resolve(result)
    clearTimeout(timeout)
  }, () => {
    reject(new Error('no permissions'))
    clearTimeout(timeout)
  })
})
