import mongoose from 'mongoose'

const tripsSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  excursionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'excursions', // Referencia al modelo de Excursion
    required: true,
  },
})

export default mongoose.model('Trip', tripsSchema)
