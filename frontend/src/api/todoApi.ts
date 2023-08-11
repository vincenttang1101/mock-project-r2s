import axiosClient from '@api/axiosClient'
import { TODO_API_URL } from '@constants'
import { IDataResponse, ITodo, ITodoAPI, ITodosFilter } from '@typing'

const todoApi = {
  getTodos(): Promise<IDataResponse<ITodoAPI[]>> {
    return axiosClient.get(TODO_API_URL)
  },
  addTodo(params: any): Promise<IDataResponse<ITodoAPI>> {
    return axiosClient.post(TODO_API_URL, params)
  },
  updateTodo(todo: ITodoAPI | any): Promise<IDataResponse<ITodoAPI>> {
    return axiosClient.patch(`${TODO_API_URL}/${todo._id}`, todo)
  },
  deleteTodo(
    _id: string,
    startPage: number,
    limit: number,
    filterType: ITodosFilter
  ): Promise<IDataResponse<ITodoAPI[]>> {
    if (Object.values(filterType)[1] === undefined) {
      return axiosClient.delete(`${TODO_API_URL}/${_id}/?startPage=${startPage}&limit=${limit}`)
    } else {
      return axiosClient.delete(
        `${TODO_API_URL}/${_id}/?startPage=${startPage}&limit=${limit}&filterType=${Object.keys(filterType)[1]}&value=${
          Object.values(filterType)[1]
        }`
      )
    }
  },
  paginateTodos(startPage: number, limit: number, filerType: ITodosFilter): Promise<IDataResponse<ITodoAPI[]>> {
    return axiosClient.post(`${TODO_API_URL}/paginate/?startPage=${startPage}&limit=${limit}`, filerType)
  }
}

export default todoApi
