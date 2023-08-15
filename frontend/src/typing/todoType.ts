export interface ITodo {
  _id?: string
  title: string
  priority: string
  isCompleted: boolean
  createdAt?: string
}

export interface ITodoAPI {
  _id?: string
  title: string
  priority: string
  isCompleted: boolean
  createdAt: string
  updatedAt: string
  message?: string
}

export interface ITodosFilter {
  user_id?: string | null
  priority?: string
  isCompleted?: string
}

export interface ITodoState {
  todos: ITodo[]
  status: 'idle' | 'loading' | 'failed'
  totalTodos: number
  startPage: number
  limit: number
  filterType: ITodosFilter
  message: string
}

export interface IAddTodoParams {
  filterType: ITodosFilter
  title: string
  priority: string
  isCompleted: boolean
  user_id: string | null
}

export interface IUpdateTodoParams {
  _id: string | undefined
  title?: string
  priority?: string
  isCompleted?: boolean
  user_id?: string | null
}

export interface IDeleteTodoParams {
  _id: string
  startPage: number
  limit: number
  filterType: ITodosFilter
}
