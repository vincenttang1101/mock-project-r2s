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
      isCompleted: boolean().required('isCompleted is a required field'),
      user_id: string().required('User ID is a required field')
    })

    await todoSchema.validate(req.body, { abortEarly: false })

    const todoExists = await Todo.findOne({ title: req.body.title, user_id: req.body.user_id })
    if (todoExists) {
      return res.status(500).json({ message: 'Title already exists' })
    }

    let filterType: any = { user_id: req.body.user_id }

    const newTodo = new Todo(req.body)
    await newTodo.save()

    if (req.body.filterType.priority === 'Low') {
      filterType.priority = req.body.priority
    } else if (req.body.filterType.priority === 'Medium') {
      filterType.priority = req.body.priority
    } else if (req.body.filterType.priority === 'High') {
      filterType.priority = req.body.priority
    }

    const totalTodos = await Todo.countDocuments(filterType)

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
    const todoSchema = object().shape({
      title: string().required('Title is a required field').min(3, 'Too short !').max(30, 'Too long !'),
      priority: string()
        .oneOf(['Low', 'Medium', 'High'], 'Priority must be either Low, Medium, or High')
        .required('Priority is a required field'),
      isCompleted: boolean().required('isCompleted is a required field'),
      user_id: string().required('User ID is a required field')
    })

    await todoSchema.validate(req.body, { abortEarly: false })

    const { id } = req.params

    const todoExists = await Todo.findOne({ title: req.body.title, user_id: req.body.user_id })

    if (todoExists) {
      return res.status(500).json({ message: 'Title already exists' })
    }

    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true })

    return res.status(200).json({ message: 'Todo updated successfully', data: todo })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}

export const deleteTodo: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    let startPageClient = Number(req.query.startPage) || 1
    let limitClient = Number(req.query.limit) || 4
    let filterTypeClient = req.query.filterType
    let valueFilterTypeClient = req.query.value
    var filterType: any = {}

    filterType[filterTypeClient] = valueFilterTypeClient

    await Todo.findById(id).then((todo: any) => {
      filterType.user_id = todo.user_id
    })

    const handleFilterType = Object.entries(filterType).reduce((acc, [key, value]) => {
      if (value !== 'undefined') {
        acc[key] = value
      }
      return acc
    }, {})

    let totalTodos = await Todo.countDocuments(handleFilterType)

    const initialLimit = 4
    let tototalPages = Math.ceil(totalTodos / initialLimit)
    let skip

    if (startPageClient === tototalPages) {
      skip = 0
      startPageClient = limitClient === 1 ? startPageClient - 1 : startPageClient
      limitClient = limitClient === 1 ? initialLimit : limitClient - 1

      await Todo.findByIdAndDelete(id)
      totalTodos = await Todo.countDocuments(handleFilterType)
    } else {
      const todo = await Todo.findByIdAndDelete(id)
      filterType.user_id = todo?.user_id

      totalTodos = await Todo.countDocuments(handleFilterType)
      skip = totalTodos - startPageClient * limitClient
    }

    const todos = await Todo.find(handleFilterType).skip(skip).limit(limitClient)
    return res.status(200).json({
      message: 'Todo deleted successfully',
      data: todos,
      totalTodos: totalTodos,
      limit: limitClient,
      startPage: startPageClient
    })
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
    const paginationSchema = object().shape({
      user_id: string().required('User ID is a required field')
    })

    await paginationSchema.validate(req.body, { abortEarly: false })
    const startPage = Number(req.query.startPage) || 1
    let limitClient = Number(req.query.limit) || 4

    let filterType: any = { user_id: req.body.user_id }

    if (req.body.isCompleted) {
      filterType.isCompleted = req.body.isCompleted
    } else if (req.body.priority) {
      filterType.priority = req.body.priority
    }

    const totalTodos = await Todo.countDocuments(filterType)
    if (totalTodos === 0) return res.status(200).json({ message: 'Paginate Todos', data: [], filterType })

    const initialLimit = 4
    const tototalPages = Math.ceil(totalTodos / initialLimit)

    let skip

    if (startPage === tototalPages) {
      skip = 0
    } else skip = totalTodos - startPage * limitClient

    const todos = await Todo.find(filterType).skip(skip).limit(limitClient)

    return res
      .status(200)
      .json({ message: 'Paginate Todos', data: todos, totalTodos, startPage, limit: limitClient, filterType })
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
