import { Schema, model } from 'mongoose'
import { IUser } from '../type'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema<IUser>({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
})

userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password
    return ret
  }
})

userSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 4)
  }
  next()
})

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this
  const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_KEY || 'VincentTang')
  await user.save()

  return accessToken
}

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error('Invalid login credentials')
    error.message = 'Invalid login credentials'
    throw error
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    const error = new Error('Invalid login credentials')
    error.message = 'Invalid login credentials'
    throw error
  }
  return user
}
export const User = model<IUser>('User', userSchema)
