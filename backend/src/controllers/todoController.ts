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
