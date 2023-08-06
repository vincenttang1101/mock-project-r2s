export interface ITodo {
  _id?: string
  title: string
  priority: string
  isCompleted: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ITodoState {
  todos: ITodo[]
  status: 'idle' | 'loading' | 'failed'
  totalTodos: number
}
