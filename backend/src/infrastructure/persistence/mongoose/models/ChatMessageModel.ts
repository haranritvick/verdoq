import mongoose from 'mongoose';
import ChatMessageSchema from '../schemas/ChatMessageSchema';

export const ChatMessageModel = mongoose.model('ChatMessage', ChatMessageSchema);
