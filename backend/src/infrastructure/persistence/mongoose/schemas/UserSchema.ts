import { Schema } from 'mongoose';

export interface IUserDocument {
  _id: string;
  googleId: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    _id: { type: String, required: true },
    googleId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatar: { type: String, default: '' },
  },
  {
    timestamps: true,
    _id: false,
  }
);

export default UserSchema;
