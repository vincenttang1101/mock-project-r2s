import { ACCESS_TOKEN, API_BASE_URL } from '@constants'
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'

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
    if (error.response && error.response.data && error.response.data.message === 'Token expired') {
      localStorage.removeItem(ACCESS_TOKEN)
      alert('Token expired')
      window.location.replace('/login')
    }
    return Promise.reject(error)
  }
)

export default axiosClient
