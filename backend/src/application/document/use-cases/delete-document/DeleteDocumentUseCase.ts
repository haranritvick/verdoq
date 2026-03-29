import { IRequest } from './IRequest';
import { IDocumentRepository } from '../../../../domain/document/repositories/IDocumentRepository';
import { IChatRepository } from '../../../../domain/chat/repositories/IChatRepository';
import { DocumentId } from '../../../../domain/document/value-objects/DocumentId';
import { UserId } from '../../../../domain/user/value-objects/UserId';
import { NotFoundError, ForbiddenError } from '../../../../domain/errors';

export class DeleteDocumentUseCase {
  constructor(
    private readonly documentRepo: IDocumentRepository,
    private readonly chatRepo: IChatRepository,
  ) {}

  async execute(req: IRequest): Promise<void> {
    const docId = DocumentId.from(req.documentId);
    const document = await this.documentRepo.findById(docId);
    if (!document) throw new NotFoundError('Document not found');

    if (!document.isOwnedBy(UserId.from(req.requestingUserId)))
      throw new ForbiddenError('You do not own this document');

    // Cascade delete — application layer orchestrates across repos
    await this.chatRepo.deleteByDocumentId(docId);
    await this.documentRepo.delete(docId);
  }
}
