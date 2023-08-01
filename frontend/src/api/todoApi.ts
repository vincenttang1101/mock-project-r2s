import { ITodo, IDataResponse } from '@typing'
import axiosClient from '@api/axiosClient'

const todoApi = {
  getTodos(): Promise<IDataResponse<ITodo[]>> {
    const url = '/todos'
    return axiosClient.get(url)

  },
  addTodo(todo: ITodo): Promise<IDataResponse<ITodo>> {
    const url = '/todos'
    return axiosClient.post(url, todo)
  },
}

export default todoApi
