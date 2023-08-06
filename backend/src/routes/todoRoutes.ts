import { Router } from 'express'
import { addTodo, deleteTodo, getTodos, paginateTodos, updateTodo } from '../controllers'
import { checkAuthToken } from '../middlewares'

const router = Router()

router.get('/', checkAuthToken, getTodos)
router.post('/', checkAuthToken, addTodo)
router.patch('/:id', checkAuthToken, updateTodo)
router.delete('/:id', checkAuthToken, deleteTodo)
router.get('/paginate', checkAuthToken, paginateTodos)

export const todoRoutes = router
