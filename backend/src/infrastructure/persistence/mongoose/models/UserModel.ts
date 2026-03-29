import mongoose from 'mongoose';
import UserSchema from '../schemas/UserSchema';

export const UserModel = mongoose.model('User', UserSchema);
