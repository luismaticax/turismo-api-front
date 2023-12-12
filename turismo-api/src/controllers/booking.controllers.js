import Booking from '../models/bookings.model.js'

export const bookTrip = async (req, res) => {
  try {
    console.log(req.body)
    const clientId = req.body.clientId
    const tripId = req.body.tripId

    const newBooking = new Booking({
      clientId,
      tripId,
    })

    const savedBooking = await newBooking.save()

    res.status(201).json(savedBooking)
  } catch (error) {
    console.error('Error al reservar el viaje:', error)
    res.status(500).json({ message: 'Error al reservar el viaje.' })
  }
}
