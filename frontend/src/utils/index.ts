export const isAuthenticated = () => {
  return localStorage.getItem('access-token') !== null
}
