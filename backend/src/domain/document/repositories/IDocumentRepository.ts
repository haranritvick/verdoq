import { Document } from '../entities/Document';
import { DocumentId } from '../value-objects/DocumentId';
import { UserId } from '../../user/value-objects/UserId';

export interface IDocumentRepository {
  save(document: Document): Promise<void>;
  findById(id: DocumentId): Promise<Document | null>;
  findByUserId(userId: UserId, page: number, limit: number): Promise<{ docs: Document[]; total: number }>;
  delete(id: DocumentId): Promise<void>;
}
