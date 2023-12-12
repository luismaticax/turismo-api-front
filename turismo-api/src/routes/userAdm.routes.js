import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getUser, deleteUser, updateUser, createUser } from '../controllers/userAdm.controller.js'

const router = Router()

router.get('/getUser/:documentId', authRequired, getUser)
router.delete('/deleteUser/:id', authRequired, deleteUser)
router.post('/updateUser/:id', authRequired, updateUser)
router.post('/createUser', authRequired, createUser)

export default router
