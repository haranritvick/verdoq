import mongoose from 'mongoose';
import DocumentSchema from '../schemas/DocumentSchema';

export const DocumentModel = mongoose.model('Document', DocumentSchema);
