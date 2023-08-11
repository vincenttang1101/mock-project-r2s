import { Schema } from 'mongoose'

export interface ITodo {
  _id?: string
  title: string
  priority: string
  isCompleted: boolean
  user_id: Schema.Types.ObjectId
}
