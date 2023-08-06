import { ACCESS_TOKEN } from '@constants'

export const isAuthenticated = () => {
  return localStorage.getItem(ACCESS_TOKEN) !== null
}
