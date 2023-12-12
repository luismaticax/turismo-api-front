import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    //validate: emailValidator,
  },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  phone: { type: String, trim: true, required: true },
  password: { type: String, required: true },
  documentId: { type: String, required: true, unique: true },
  role: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
})

export default mongoose.model('User', userSchema)
