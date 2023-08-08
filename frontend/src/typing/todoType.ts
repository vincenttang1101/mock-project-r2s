export interface ITodo {
  _id?: string
  title: string
  priority: string
  isCompleted: boolean
}

export interface ITodoAPI {
  _id?: string
  title: string
  priority: string
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}

export interface ITodoFilter {
  priority?: string
  isCompleted?: string
  type?: object
}

export interface ITodoState {
  todos: ITodo[]
  status: 'idle' | 'loading' | 'failed'
  totalTodos: number
  startPage: number
  limit: number
  filterType: object
}
