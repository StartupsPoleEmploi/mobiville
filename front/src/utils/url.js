export const paramUrlToObject = (paramsUrl = '') => {
  let params = paramsUrl
  const object = {}
  if (params.charAt(0) === '?') {
    params = params.substring(1)
  }

  params.split('&').forEach((oneParam) => {
    const list = oneParam.split('=')
    if (list.length > 1) {
      const node = list.shift()
      object[node] = list[0].split(',')
    }
  })

  return object
}

export const objectToQueryString = (params = {}) =>
  Object.entries(params)
    .reduce((prev, [key, value]) => {
      if (!value) return prev
      return prev.concat(`${key}=${encodeURIComponent(value)}&`)
    }, '?')
    .slice(0, -1)
