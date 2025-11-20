import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  document: string;
  name: string;
  email: string;
  password: string;
  confirmpassword?: string;
}

const userSchema = new Schema<IUser>(
  {
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

const User = model<IUser>('User', userSchema)
export default User
