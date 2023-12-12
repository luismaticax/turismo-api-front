import Excursion from '../models/excursions.model.js'

export const getExcursions = async (req, res) => {
  const excursionsFound = await Excursion.find({})

  if (excursionsFound.length === 0) {
    return res.status(404).json({ message: 'Excursions not found' })
  }

  const formattedExcursions = excursionsFound.map((excursion) => ({
    id: excursion.id,
    startDate: excursion.startDate,
    endDate: excursion.endDate,
    description: excursion.description,
    season: excursion.season,
    price: excursion.price,
  }))

  return res.json(formattedExcursions)
}
