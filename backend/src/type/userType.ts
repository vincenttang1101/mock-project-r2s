import { Document } from 'mongoose'

export interface IUser extends Document {
  _id: string
  name: string
  email: string
  password: string
  toJSON(): any
  findByCredentials(email: string, password: string): any
}
