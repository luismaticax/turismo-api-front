import Trip from '../models/trips.model.js'
import Excursion from '../models/excursions.model.js'

export const getTripsByExcursionId = async (req, res) => {
  const excursionId = req.params.id
  console.log(excursionId)

  try {
    // Buscar la excursión para asegurarnos de que existe
    const excursion = await Excursion.findById(excursionId)
    if (!excursion) {
      return res.status(404).json({ message: 'Excursion not found' })
    }

    // Buscar los viajes relacionados con la excursión
    const tripsFound = await Trip.find({ excursionId })

    if (tripsFound.length === 0) {
      return res.status(404).json({ message: 'Trips not found for the specified excursion' })
    }

    return res.json(tripsFound)
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
