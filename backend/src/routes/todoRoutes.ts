import { Router } from 'express'
import { addTodo, deleteTodo, filterTodos, getTodos, paginateTodos, updateTodo } from '../controllers'
import { checkAuthToken } from '../middlewares'

const router = Router()

router.get('/', checkAuthToken, getTodos)
router.post('/paginate', checkAuthToken, paginateTodos)
router.post('/filter', checkAuthToken, filterTodos)
router.post('/', checkAuthToken, addTodo)
router.patch('/:id', checkAuthToken, updateTodo)
router.delete('/:id', checkAuthToken, deleteTodo)

export const todoRoutes = router
