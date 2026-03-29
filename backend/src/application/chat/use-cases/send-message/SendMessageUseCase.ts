import { IRequest } from './IRequest';
import { IResponse } from './IResponse';
import { IChatRepository } from '../../../../domain/chat/repositories/IChatRepository';
import { IDocumentRepository } from '../../../../domain/document/repositories/IDocumentRepository';
import { IChatAIPort } from '../../ports/IChatAIPort';
import { ChatMessage } from '../../../../domain/chat/entities/ChatMessage';
import { DocumentId } from '../../../../domain/document/value-objects/DocumentId';
import { UserId } from '../../../../domain/user/value-objects/UserId';
import { MessageRole } from '../../../../domain/chat/value-objects/MessageRole';
import { NotFoundError, ForbiddenError } from '../../../../domain/errors';
import { ChatMapper } from '../../../../interfaces/mappers/ChatMapper';

export class SendMessageUseCase {
  constructor(
    private readonly chatRepo: IChatRepository,
    private readonly documentRepo: IDocumentRepository,
    private readonly chatAI: IChatAIPort,
  ) {}

  async execute(req: IRequest): Promise<IResponse> {
    // Load document for context
    const document = await this.documentRepo.findById(DocumentId.from(req.documentId));
    if (!document) throw new NotFoundError('Document not found');
    if (!document.isOwnedBy(UserId.from(req.userId))) throw new ForbiddenError('Forbidden');

    // Save user's message
    const userMessage = ChatMessage.create({
      documentId: document.id,
      userId: UserId.from(req.userId),
      role: MessageRole.USER,
      content: req.content,
    });
    await this.chatRepo.save(userMessage);

    // Fetch history for context window
    const history = await this.chatRepo.findByDocumentId(document.id);

    // Call AI port — reply
    const replyText = await this.chatAI.reply(history, document);

    // Save assistant reply
    const assistantMessage = ChatMessage.create({
      documentId: document.id,
      userId: UserId.from(req.userId),
      role: MessageRole.ASSISTANT,
      content: replyText,
    });
    await this.chatRepo.save(assistantMessage);

    return ChatMapper.toResponse(assistantMessage);
  }
}
