export const ucFirst = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const ucFirstOnly = (s) => {
  if (typeof s !== 'string') return ''
  return ucFirst(s.toLowerCase())
}
