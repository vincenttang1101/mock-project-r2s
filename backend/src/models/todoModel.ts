import { Schema, Types, model } from 'mongoose'
import { ITodo } from '../typing/'

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String
    },
    priority: {
      type: String
    },
    isCompleted: {
      type: Boolean
    }
  },
  { timestamps: true }
)

export const Todo = model<ITodo>('Todo', todoSchema)
