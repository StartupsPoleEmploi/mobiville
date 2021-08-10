export const getPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (result) => {
        resolve(result.coords)
      },
      () => {
        reject(new Error('no permissions'))
      },
      { maximumAge: 60000, timeout: 20000, enableHighAccuracy: true }
    )
  })
