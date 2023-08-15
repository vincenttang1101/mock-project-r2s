export interface IDataResponse<T> {
  data: T
  totalTodos: number
  startPage: number
  limit: number
  filterType: object
  accessToken: string
  message?: string
}
