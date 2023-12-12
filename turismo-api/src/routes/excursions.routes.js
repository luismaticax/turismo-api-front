import { Router } from 'express'

import { getExcursions } from '../controllers/excursions.controller.js'

const router = Router()

router.get('/getExcursions', getExcursions)

export default router
