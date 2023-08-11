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
}
