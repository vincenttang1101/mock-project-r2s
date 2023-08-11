import { Schema, model } from 'mongoose'
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
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

export const Todo = model<ITodo>('Todo', todoSchema)
