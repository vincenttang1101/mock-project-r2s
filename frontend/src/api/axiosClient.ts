import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ACCESS_TOKEN, API_BASE_URL } from '@constants'

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    // Do something before request is sent
    const accessToken = localStorage.getItem(ACCESS_TOKEN)

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    if (
      error.response.data.message === 'Email already exists' ||
      error.response.data.message === 'Invalid login credentials'
    ) {
      alert(error.response.data.message)
    } else if (error.response.data.message === 'Token expired' || error.response.data.message === 'Unauthorized') {
      localStorage.removeItem(ACCESS_TOKEN)
      window.location.href = '/login'
    } else if (error.response.data.message === 'Title already exists') {
      alert(error.response.data.message)
    }

    return Promise.reject(error)
  }
)

export default axiosClient
