import { Router } from 'express'
import { addTodo, getTodos } from '../controllers'
import { checkAuthToken } from '../middlewares'

const router = Router()

router.get('/', checkAuthToken, getTodos)
router.post('/', checkAuthToken, addTodo)

export const todoRoutes = router
