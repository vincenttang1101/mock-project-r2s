import { Router } from 'express'
import { addTodo } from '../controllers'

const router = Router()

router.post('/', addTodo)

export const todoRoutes = router
