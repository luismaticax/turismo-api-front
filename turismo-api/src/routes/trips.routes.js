import { Router } from 'express'

import { getTripsByExcursionId } from '../controllers/trips.controllers.js'

const router = Router()

router.get('/getTripsByExcursion/:id', getTripsByExcursionId)

export default router
