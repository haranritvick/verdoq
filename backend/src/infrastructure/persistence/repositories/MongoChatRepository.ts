import { IChatRepository } from '../../../domain/chat/repositories/IChatRepository';
import { ChatMessage } from '../../../domain/chat/entities/ChatMessage';
import { DocumentId } from '../../../domain/document/value-objects/DocumentId';
import { ChatMessageModel } from '../mongoose/models/ChatMessageModel';
import { ChatMapper } from '../../../interfaces/mappers/ChatMapper';

export class MongoChatRepository implements IChatRepository {
  async save(message: ChatMessage): Promise<void> {
    const raw = ChatMapper.toPersistence(message);
    await ChatMessageModel.findByIdAndUpdate(raw._id, raw, { upsert: true, new: true });
  }

  async findByDocumentId(documentId: DocumentId): Promise<ChatMessage[]> {
    const docs = await ChatMessageModel.find({ documentId: documentId.toString() })
      .sort({ createdAt: 1 });
    return docs.map((d) => ChatMapper.toDomain(d));
  }

  async deleteByDocumentId(documentId: DocumentId): Promise<void> {
    await ChatMessageModel.deleteMany({ documentId: documentId.toString() });
  }
}
