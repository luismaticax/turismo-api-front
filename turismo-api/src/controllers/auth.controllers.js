import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import { TOKEN_SECRET } from '../config.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const { email, firstName, lastName, phone, password, documentId } = req.body

  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      firstName,
      lastName,
      phone,
      password: passwordHash,
      documentId,
      role: 'User',
    })
    const userSaved = await newUser.save()
    const token = await createAccessToken({ id: userSaved._id })
    res.cookie('token', token)
    res.json({
      id: userSaved._id,
      firstName: userSaved.firstName,
      lastName: userSaved.lastName,
      documentId: userSaved.documentId,
      phone: userSaved.phone,
      email: userSaved.email,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const userFound = await User.findOne({ email })
    if (!userFound) return res.status(400).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' })

    const token = await createAccessToken({ id: userFound._id, role: userFound.role })

    res.cookie('token', token)
    res.json({
      id: userFound._id,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      documentId: userFound.documentId,
      role: userFound.role,
      email: userFound.email,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
  })
  return res.sendStatus(200)
}

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)

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

export const verifyToken = async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' })
    const userFound = await User.findById(user.id)
    if (!userFound) return res.status(401).json({ message: 'Unauthorized' })
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
    })
  })
}
