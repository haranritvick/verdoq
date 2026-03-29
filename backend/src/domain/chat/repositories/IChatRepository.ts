import { ChatMessage } from '../entities/ChatMessage';
import { DocumentId } from '../../document/value-objects/DocumentId';

export interface IChatRepository {
  save(message: ChatMessage): Promise<void>;
  findByDocumentId(documentId: DocumentId): Promise<ChatMessage[]>;
  deleteByDocumentId(documentId: DocumentId): Promise<void>;
}
