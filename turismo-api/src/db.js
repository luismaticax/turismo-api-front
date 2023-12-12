import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    //await mongoose.connect('mongodb://127.0.0.1:27017/tourismdb')
    await mongoose.connect(
      'mongodb+srv://userturismo:0kjh4ZKAfv9t3PCZ@cluster0.xawcsk0.mongodb.net/tourismdb',
    )
    console.log('DB connected')
  } catch (err) {
    console.log(err)
  }
}
