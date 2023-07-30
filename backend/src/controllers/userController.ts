import { Request, RequestHandler, Response } from 'express'
import { User } from '../models'
import { object, string, ValidationError } from 'yup'

export const RegisterUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userSchema = object().shape({
      name: string().required('Name is a required field'),
      email: string().required('Email is a required field').email(),
      password: string().required('Password is a required field')
    })

    await userSchema.validate(req.body, { abortEarly: false })

    const userExists = await User.findOne({ email: req.body.email })

    if (userExists) {
      const errors = { email: 'Email already exists' }
      return res.status(400).json({ errors })
    }

    const newUser = new User(req.body)
    await newUser.save()

    return res.status(200).json({ message: 'User created successfully', data: newUser })
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

export const LoginUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findByCredentials(email, password)
    const accessToken = await user.generateAuthToken()

    return res.status(200).json({ message: 'User login successfully', data: { user, accessToken } })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    res.status(200).json({ message: 'User List', data: users })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}