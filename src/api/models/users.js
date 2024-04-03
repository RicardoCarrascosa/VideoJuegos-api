const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    userName: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    birthDay: { type: Number, trim: true, required: true },
    rol: { type: String, trim: true, required: true },
    profileImage: { type: String, trim: true, required: true }
  },
  {
    timestamps: true,
    collecton: 'users'
  }
)

// Encrypt the password before saving
userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10)
})

const User = mongoose.model('users', userSchema, 'users')

module.exports = { User }
