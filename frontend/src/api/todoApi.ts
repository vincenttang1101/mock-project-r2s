import axiosClient from '@api/axiosClient'
import { TODO_API_URL } from '@constants'
import { ITodo, IDataResponse } from '@typing'

const todoApi = {
  getTodos(): Promise<IDataResponse<ITodo[]>> {
    return axiosClient.get(TODO_API_URL)
  },
  addTodo(todo: ITodo): Promise<IDataResponse<ITodo>> {
    return axiosClient.post(TODO_API_URL, todo)
  },
  updateTodo(todo: ITodo): Promise<IDataResponse<ITodo>> {
    return axiosClient.patch(`${TODO_API_URL}/${todo._id}`, todo)
  },
  deleteTodo(_id: string): Promise<IDataResponse<any>> {
    return axiosClient.delete(`${TODO_API_URL}/${_id}`)
  },
  paginateTodos(startPage: number, limit: number): Promise<IDataResponse<ITodo[]>> {
    return axiosClient.get(`${TODO_API_URL}/paginate/?startPage=${startPage}&limit=${limit}`)
  }
}

export default todoApi
