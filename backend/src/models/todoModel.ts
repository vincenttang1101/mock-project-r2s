import { Schema, Types, model } from 'mongoose'
import { ITodo } from '../typing/'

const todoSchema = new Schema<ITodo>({
  title: {
    type: String
  },
  priority: {
    type: String
  },
  isCompleted: {
    type: Boolean
  }
})

export const Todo = model<ITodo>('Todo', todoSchema)
