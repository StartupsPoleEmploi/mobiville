export const login = (email, password) => new Promise((resolve) => {
  resolve({ id: 1, email, password })
})

export const currentUser = () => new Promise((resolve) => {
  resolve(null)
})
