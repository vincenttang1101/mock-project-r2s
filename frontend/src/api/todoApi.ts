import axiosClient from '@api/axiosClient'
import { TODO_API_URL } from '@constants'
import { IAddTodoParams, IUpdateTodoParams, IDeleteTodoParams, IDataResponse, ITodoAPI, ITodosFilter } from '@typing'

const todoApi = {
  getTodos(): Promise<IDataResponse<ITodoAPI[]>> {
    return axiosClient.get(TODO_API_URL)
  },
  addTodo(params: IAddTodoParams): Promise<IDataResponse<ITodoAPI>> {
    return axiosClient.post(TODO_API_URL, params)
  },
  updateTodo(params: IUpdateTodoParams): Promise<IDataResponse<ITodoAPI>> {
    return axiosClient.patch(`${TODO_API_URL}/${params._id}`, params)
  },
  deleteTodo(params: IDeleteTodoParams): Promise<IDataResponse<ITodoAPI[]>> {
    if (Object.values(params.filterType)[1] === undefined) {
      return axiosClient.delete(`${TODO_API_URL}/${params._id}/?startPage=${params.startPage}&limit=${params.limit}`)
    } else {
      return axiosClient.delete(
        `${TODO_API_URL}/${params._id}/?startPage=${params.startPage}&limit=${params.limit}&filterType=${
          Object.keys(params.filterType)[1]
        }&value=${Object.values(params.filterType)[1]}`
      )
    }
  },
  paginateTodos(startPage: number, limit: number, filerType: ITodosFilter): Promise<IDataResponse<ITodoAPI[]>> {
    return axiosClient.post(`${TODO_API_URL}/paginate/?startPage=${startPage}&limit=${limit}`, filerType)
  }
}

export default todoApi
