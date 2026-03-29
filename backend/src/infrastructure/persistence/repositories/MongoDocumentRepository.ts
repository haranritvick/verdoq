import { IDocumentRepository } from '../../../domain/document/repositories/IDocumentRepository';
import { Document } from '../../../domain/document/entities/Document';
import { DocumentId } from '../../../domain/document/value-objects/DocumentId';
import { UserId } from '../../../domain/user/value-objects/UserId';
import { DocumentModel } from '../mongoose/models/DocumentModel';
import { DocumentMapper } from '../../../interfaces/mappers/DocumentMapper';

export class MongoDocumentRepository implements IDocumentRepository {
  async save(document: Document): Promise<void> {
    const raw = DocumentMapper.toPersistence(document);
    await DocumentModel.findByIdAndUpdate(raw._id, raw, { upsert: true, new: true });
  }

  async findById(id: DocumentId): Promise<Document | null> {
    const raw = await DocumentModel.findById(id.toString());
    return raw ? DocumentMapper.toDomain(raw) : null;
  }

  async findByUserId(userId: UserId, page: number, limit: number): Promise<{ docs: Document[]; total: number }> {
    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      DocumentModel.find({ userId: userId.toString() })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      DocumentModel.countDocuments({ userId: userId.toString() }),
    ]);
    return {
      docs: docs.map((d) => DocumentMapper.toDomain(d)),
      total,
    };
  }

  async delete(id: DocumentId): Promise<void> {
    await DocumentModel.findByIdAndDelete(id.toString());
  }
}
