import { IRequest } from './IRequest';
import { IResponse } from './IResponse';
import { IChatRepository } from '../../../../domain/chat/repositories/IChatRepository';
import { IDocumentRepository } from '../../../../domain/document/repositories/IDocumentRepository';
import { DocumentId } from '../../../../domain/document/value-objects/DocumentId';
import { UserId } from '../../../../domain/user/value-objects/UserId';
import { NotFoundError, ForbiddenError } from '../../../../domain/errors';

export class ClearChatHistoryUseCase {
  constructor(
    private readonly chatRepo: IChatRepository,
    private readonly documentRepo: IDocumentRepository,
  ) {}

  async execute(req: IRequest): Promise<IResponse> {
    const document = await this.documentRepo.findById(DocumentId.from(req.documentId));
    if (!document) throw new NotFoundError('Document not found');
    if (!document.isOwnedBy(UserId.from(req.userId))) throw new ForbiddenError('Forbidden');

    const messages = await this.chatRepo.findByDocumentId(document.id);
    const count = messages.length;
    await this.chatRepo.deleteByDocumentId(document.id);

    return { success: true, deleted: count };
  }
}
