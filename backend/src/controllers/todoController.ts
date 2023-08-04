import { Request, RequestHandler, Response } from 'express'
import { boolean, object, string, ValidationError } from 'yup'
import { Todo } from '../models/'

export const addTodo: RequestHandler = async (req: Request, res: Response) => {
  try {
    const todoSchema = object().shape({
      title: string().required('Title is a required field').min(3, 'Too short !').max(30, 'Too long !'),
      priority: string()
        .oneOf(['Low', 'Medium', 'High'], 'Priority must be either Low, Medium, or High')
        .required('Priority is a required field'),
      isCompleted: boolean().required('isCompleted is a required field')
    })

    await todoSchema.validate(req.body, { abortEarly: false })

    const newTodo = new Todo(req.body)
    await newTodo.save()

    return res.status(200).json({ message: 'Todo added successfully', data: newTodo })
  } catch (err: any) {
    if (err instanceof ValidationError) {
      const errors = {}
      err.inner.forEach((e) => {
        errors[e.path] = e.message
      })
      return res.status(400).json({ errors })
    }
    return res.status(500).json({ message: err.message })
  }
}

export const updateTodo: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).json({ message: 'Todo updated successfully', data: todo })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}

export const deleteTodo: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const isDeleted = await Todo.findByIdAndDelete(id)

    if (!isDeleted) throw new Error('Failed to delete todo')

    return res.status(200).json({ message: 'Todo deleted successfully', data: isDeleted })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}

export const getTodos: RequestHandler = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find()
    return res.status(200).json({ message: 'Todo List', data: todos })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}

export const paginateTodos: RequestHandler = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 4
    const skip = (page - 1) * limit

    const todos = await Todo.find().skip(skip).limit(limit)
    const totalTodos = await Todo.countDocuments()

    return res.status(200).json({ message: 'Paginate Todos', data: todos, totalItems: totalTodos })
  } catch (err: any) {}
}
