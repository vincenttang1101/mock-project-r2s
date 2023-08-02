import { apiEndpoint } from '@constants';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom';


const axiosClient = axios.create({
  baseURL: apiEndpoint,
  headers: {
    'Content-Type': 'application/json'
  }
})


// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    const accessToken = localStorage.getItem('access-token')

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    const navigate = useNavigate()
    if (error.response && error.response.data && error.response.data.message === 'Token expired') {
      localStorage.removeItem('access-token');
      alert('Token expired');
      navigate('/login');
    }
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
    return Promise.reject(error)
  }
)

export default axiosClient
