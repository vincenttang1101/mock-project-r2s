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

    const totalTodos = await Todo.countDocuments()

    return res.status(200).json({ message: 'Todo added successfully', data: newTodo, totalTodos })
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
    const totalTodos = await Todo.countDocuments()

    return res.status(200).json({ message: 'Todo updated successfully', data: todo, totalTodos })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}

export const deleteTodo: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await Todo.findByIdAndDelete(id)

    const startPage = Number(req.query.startPage) || 1
    const limit = Number(req.query.limit) || 4

    const totalTodos = await Todo.countDocuments()

    let skip = totalTodos - startPage * limit

    if (skip < 0) {
      skip = 0
    }
    const todos = await Todo.find().skip(skip).limit(limit)

    return res.status(200).json({ message: 'Todo deleted successfully', data: todos, totalTodos })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}

export const getTodos: RequestHandler = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find()
    const totalTodos = await Todo.countDocuments()

    return res.status(200).json({ message: 'Todo List', data: todos, totalTodos })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}

export const paginateTodos: RequestHandler = async (req: Request, res: Response) => {
  try {
    const startPage = Number(req.query.startPage) || 1
    let limit = Number(req.query.limit) || 4

    let filterType: object = {}

    if (req.body.isCompleted) {
      filterType = { isCompleted: req.body.isCompleted }
    } else if (req.body.priority) {
      filterType = { priority: req.body.priority }
    } else {
      filterType = {}
    }

    const totalTodos = await Todo.countDocuments(filterType)
    let skip = totalTodos - startPage * limit

    if (skip < 0) {
      skip = 0
      limit = totalTodos % limit
    }

    const todos = await Todo.find(filterType).skip(skip).limit(limit)

    return res.status(200).json({ message: 'Paginate Todos', data: todos, totalTodos, startPage, limit, filterType })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}
export const filterTodos: RequestHandler = async (req: Request, res: Response) => {
  try {
    let filter: object = {}

    if (req.body.isCompleted) {
      filter = { isCompleted: req.body.isCompleted }
    } else if (req.body.priority) {
      filter = { priority: req.body.priority }
    } else {
      filter = {}
    }

    const todos = await Todo.find(filter)
    const totalTodos = todos.length

    return res.status(200).json({ message: 'Filter Todos', data: todos, totalTodos })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}
