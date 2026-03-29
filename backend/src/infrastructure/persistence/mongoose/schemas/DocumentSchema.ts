import { Schema } from 'mongoose';

export interface IDocumentDocument {
  _id: string;
  userId: string;
  title: string;
  originalText: string;
  fileType: 'pdf' | 'docx' | 'text';
  analysis: {
    summary: string;
    documentType: string;
    riskScore: number;
    sections: { title: string; plainText: string; originalText: string }[];
    redFlags: { clause: string; explanation: string; severity: 'low' | 'medium' | 'high' }[];
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    originalText: { type: String, required: true },
    fileType: { type: String, enum: ['pdf', 'docx', 'text'], required: true },
    analysis: {
      type: {
        summary: String,
        documentType: String,
        riskScore: Number,
        sections: [
          {
            title: String,
            plainText: String,
            originalText: String,
          },
        ],
        redFlags: [
          {
            clause: String,
            explanation: String,
            severity: { type: String, enum: ['low', 'medium', 'high'] },
          },
        ],
      },
      default: null,
    },
  },
  {
    timestamps: true,
    _id: false,
  }
);

export default DocumentSchema;
