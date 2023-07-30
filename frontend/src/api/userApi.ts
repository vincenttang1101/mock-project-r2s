import { IUser } from 'type/userType'
import axiosClient from './axiosClient'
import { IDataResponse } from 'type/common'

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
