import mongoose from 'mongoose'

const bookingsSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Referencia al modelo de Client
    required: true,
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trips', // Referencia al modelo de Trip
    required: true,
  },
  // Otros campos específicos de la reserva, si los necesitas
  // ...

  // Fecha de creación de la reserva
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Booking', bookingsSchema)
