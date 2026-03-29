import crypto from 'crypto';
import { DocumentId } from '../../document/value-objects/DocumentId';
import { UserId } from '../../user/value-objects/UserId';
import { MessageRole } from '../value-objects/MessageRole';
import { MessageContent } from '../value-objects/MessageContent';

export interface CreateMessageProps {
  documentId: DocumentId;
  userId: UserId;
  role: MessageRole;
  content: string;
}

export class ChatMessage {
  constructor(
    public readonly id: string,
    public readonly documentId: DocumentId,
    public readonly userId: UserId,
    public readonly role: MessageRole,
    public readonly content: MessageContent,
    public readonly createdAt: Date,
  ) {}

  static create(props: CreateMessageProps): ChatMessage {
    return new ChatMessage(
      crypto.randomUUID(),
      props.documentId,
      props.userId,
      props.role,
      MessageContent.create(props.content),
      new Date(),
    );
  }
}
