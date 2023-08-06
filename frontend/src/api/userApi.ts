import { IUser, IDataResponse } from '@typing'
import axiosClient from './axiosClient'
import { USER_API_URL } from '@constants'

const userApi = {
  getUsers() {
    return axiosClient.get(USER_API_URL)
  },
  registerUser(data: IUser): Promise<IDataResponse<IUser>> {
    return axiosClient.post(USER_API_URL, data)
  },
  loginUser(data: IUser): Promise<IDataResponse<IUser>> {
    const url = `${USER_API_URL}/login`
    return axiosClient.post(url, data)
  }
}

export default userApi
