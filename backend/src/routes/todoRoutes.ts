import { Router } from 'express'
import { addTodo, getTodos, updateTodo } from '../controllers'
import { checkAuthToken } from '../middlewares'

const router = Router()

router.get('/', checkAuthToken, getTodos)
router.post('/', checkAuthToken, addTodo)
router.patch('/:id', checkAuthToken, updateTodo)

export const todoRoutes = router
