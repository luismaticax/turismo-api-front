import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const getUser = async (req, res) => {
  const userFound = await User.findOne({ documentId: req.params.documentId })

  if (!userFound) return res.status(400).json({ message: 'User not found' })

  return res.json({
    id: userFound._id,
    email: userFound.email,
    firstName: userFound.firstName,
    lastName: userFound.lastName,
    documentId: userFound.documentId,
    phone: userFound.phone,
    role: userFound.role,
  })
}

export const updateUser = async (req, res) => {
  console.log(req.body, req.params)
  const userFound = await User.findOneAndUpdate({ documentId: req.params.id }, req.body, {
    new: true,
  }) // New: True: Muestra el updated

  console.log(userFound)

  if (!userFound) return res.status(400).json({ message: 'User not found' })
  res.json(userFound)
}

export const deleteUser = async (req, res) => {
  const documentId = req.params.id
  const userFound = await User.findOneAndDelete({ documentId })

  if (!userFound) return res.status(400).json({ message: 'User not found' })
  res.json({ message: 'User deleted successfully' })
}

export const createUser = async (req, res) => {
  const { email, firstName, lastName, phone, password, documentId, role } = req.body

  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      firstName,
      lastName,
      phone,
      password: passwordHash,
      documentId,
      role,
    })
    const userSaved = await newUser.save()
    res.json({
      id: userSaved._id,
      firstName: userSaved.firstName,
      lastName: userSaved.lastName,
      documentId: userSaved.documentId,
      phone: userSaved.phone,
      role: userSaved.role,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
