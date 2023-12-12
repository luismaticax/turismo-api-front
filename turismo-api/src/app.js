import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import userAdm from './routes/userAdm.routes.js'
import excursionsRoutes from './routes/excursions.routes.js'
import tripsRoutes from './routes/trips.routes.js'
import bookingRoutes from './routes/booking.routes.js'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', userAdm)
app.use('/api', excursionsRoutes)
app.use('/api', tripsRoutes)
app.use('/api', bookingRoutes)

export default app
