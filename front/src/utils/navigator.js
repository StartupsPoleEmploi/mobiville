export const getPosition = () => new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('no permissions'))
  }, 15000)
  navigator.geolocation.getCurrentPosition((result) => {
    resolve(result.coords)
    clearTimeout(timeout)
  }, () => {
    reject(new Error('no permissions'))
    clearTimeout(timeout)
  })
})
