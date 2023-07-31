import { IUser, IDataResponse } from '@typing'
import axiosClient from './axiosClient'

const userApi = {
  getUsers() {
    const url = '/users'
    return axiosClient.get(url)
  },
  registerUser(data: IUser): Promise<IDataResponse<IUser>> {
    const url = '/users'
    return axiosClient.post(url, data)
  },
  loginUser(data: IUser): Promise<IDataResponse<IUser>> {
    const url = '/users/login'
    return axiosClient.post(url, data)
  }
}

export default userApi
