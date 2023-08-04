import axiosClient from '@api/axiosClient'
import { todoApiUrl } from '@constants'
import { ITodo, IDataResponse } from '@typing'

const todoApi = {
  getTodos(): Promise<IDataResponse<ITodo[]>> {
    return axiosClient.get(todoApiUrl)
  },
  addTodo(todo: ITodo): Promise<IDataResponse<ITodo>> {
    return axiosClient.post(todoApiUrl, todo)
  },
  updateTodo(todo: ITodo): Promise<IDataResponse<ITodo>> {
    return axiosClient.patch(`${todoApiUrl}/${todo._id}`, todo)
  },
  deleteTodo(_id: string): Promise<IDataResponse<any>> {
    return axiosClient.delete(`${todoApiUrl}/${_id}`)
  },
  paginateTodos(page: number, limit: number): Promise<IDataResponse<ITodo[]>> {
    return axiosClient.get(`${todoApiUrl}/paginate/?page=${page}&limit=${limit}`)
  }
}

export default todoApi
