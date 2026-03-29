import { ChatMessage } from '../../domain/chat/entities/ChatMessage';
import { DocumentId } from '../../domain/document/value-objects/DocumentId';
import { UserId } from '../../domain/user/value-objects/UserId';
import { MessageRole } from '../../domain/chat/value-objects/MessageRole';
import { MessageContent } from '../../domain/chat/value-objects/MessageContent';

export class ChatMapper {
  static toResponse(msg: ChatMessage): any {
    return {
      id: msg.id,
      role: msg.role,
      content: msg.content.toString(),
      createdAt: msg.createdAt.toISOString(),
    };
  }

  static toPersistence(msg: ChatMessage): any {
    return {
      _id: msg.id,
      documentId: msg.documentId.toString(),
      userId: msg.userId.toString(),
      role: msg.role,
      content: msg.content.toString(),
      createdAt: msg.createdAt,
    };
  }

  static toDomain(raw: any): ChatMessage {
    return new ChatMessage(
      raw._id.toString(),
      DocumentId.from(raw.documentId.toString()),
      UserId.from(raw.userId.toString()),
      raw.role as MessageRole,
      MessageContent.create(raw.content),
      raw.createdAt,
    );
  }
}
