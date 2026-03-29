import { Schema } from 'mongoose';

export interface IChatMessageDocument {
  _id: string;
  documentId: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

const ChatMessageSchema = new Schema(
  {
    _id: { type: String, required: true },
    documentId: { type: String, required: true, index: true },
    userId: { type: String, required: true },
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
    _id: false,
  }
);

ChatMessageSchema.index({ documentId: 1, createdAt: 1 });

export default ChatMessageSchema;
