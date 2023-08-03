import { IUser, IDataResponse } from '@typing'
import axiosClient from './axiosClient'
import { userApiUrl } from '@constants'

const userApi = {
  getUsers() {
    return axiosClient.get(userApiUrl)
  },
  registerUser(data: IUser): Promise<IDataResponse<IUser>> {
    return axiosClient.post(userApiUrl, data)
  },
  loginUser(data: IUser): Promise<IDataResponse<IUser>> {
    const url = `${userApiUrl}/login`
    return axiosClient.post(url, data)
  }
}

export default userApi
