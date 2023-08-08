import axiosClient from '@api/axiosClient'
import { TODO_API_URL } from '@constants'
import { IDataResponse, ITodoAPI, ITodoFilter } from '@typing'

const todoApi = {
  getTodos(): Promise<IDataResponse<ITodoAPI[]>> {
    return axiosClient.get(TODO_API_URL)
  },
  addTodo(todo: ITodoAPI): Promise<IDataResponse<ITodoAPI>> {
    return axiosClient.post(TODO_API_URL, todo)
  },
  updateTodo(todo: ITodoAPI | any): Promise<IDataResponse<ITodoAPI>> {
    return axiosClient.patch(`${TODO_API_URL}/${todo._id}`, todo)
  },
  deleteTodo(_id: string, startPage: number, limit: number): Promise<IDataResponse<ITodoAPI[]>> {
    return axiosClient.delete(`${TODO_API_URL}/${_id}/?startPage=${startPage}&limit=${limit}`)
  },
  paginateTodos(startPage: number, limit: number, type: ITodoFilter): Promise<IDataResponse<ITodoAPI[]>> {
    return axiosClient.post(`${TODO_API_URL}/paginate/?startPage=${startPage}&limit=${limit}`, type)
  },
  filterTodos(type: ITodoFilter): Promise<IDataResponse<ITodoAPI[]>> {
    return axiosClient.post(`${TODO_API_URL}/filter`, type)
  }
}

export default todoApi
