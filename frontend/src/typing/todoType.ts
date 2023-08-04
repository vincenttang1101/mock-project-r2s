export interface ITodo {
  _id?: string
  title: string
  priority: string
  isCompleted: boolean
}

export interface ITodoState {
  todos: ITodo[]
  status: 'idle' | 'loading' | 'failed'
  totalItems: number
}
