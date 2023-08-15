import { Request, RequestHandler, Response } from 'express'
import { object, string, ValidationError } from 'yup'
import { User } from '../models/'

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
      return res.status(400).json({ message: 'Email already exists' })
    }

    const newUser = new User(req.body)
    await newUser.save()

    return res.status(200).json({ message: 'User registered successfully', data: newUser })
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
    const userSchema = object().shape({
      email: string().required('Email is a required field').email(),
      password: string().required('Password is a required field')
    })

    await userSchema.validate(req.body, { abortEarly: false })

    const { email, password } = req.body

    const user = await User.findByCredentials(email, password)
    const accessToken = await user.generateAuthToken()

    return res.status(200).json({ message: 'User login successfully', data: user, accessToken })
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

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    res.status(200).json({ message: 'User List', data: users })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}
