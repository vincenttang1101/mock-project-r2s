import { Router } from 'express'
import { LoginUser, RegisterUser, getUsers } from '../controllers'
import { checkAuthToken } from '../middleware'

const router = Router()

router.post('/', RegisterUser)
router.post('/login', LoginUser)

router.get('/', checkAuthToken, getUsers)

export const userRoutes = router
