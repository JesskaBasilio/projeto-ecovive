const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  document: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  confirmpassword: {
    type: String,
    select: false //Prevents it from being returned in queries
  }
}, { timestamps: true }) // Automatically creates createdAt and updatedAt

const User = mongoose.model('User', userSchema)

module.exports = User
