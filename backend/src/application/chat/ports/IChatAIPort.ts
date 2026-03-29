import { ChatMessage } from '../../../domain/chat/entities/ChatMessage';
import { Document } from '../../../domain/document/entities/Document';

export interface IChatAIPort {
  reply(history: ChatMessage[], document: Document): Promise<string>;
}
