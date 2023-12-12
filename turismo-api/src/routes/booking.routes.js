import { Router } from 'express'

import { bookTrip } from '../controllers/booking.controllers.js'

const router = Router()

router.post('/bookTrip', bookTrip)

export default router
