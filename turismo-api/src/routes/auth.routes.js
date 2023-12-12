import { Router } from 'express'
import { login, register, logout, profile, verifyToken } from '../controllers/auth.controllers.js'
import { authRequired } from '../middlewares/validateToken.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/verify', verifyToken)

router.get('/profile/:id', authRequired, profile)

export default router
