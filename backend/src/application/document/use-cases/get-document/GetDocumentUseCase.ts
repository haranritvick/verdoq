import { IRequest } from './IRequest';
import { IResponse } from './IResponse';
import { IDocumentRepository } from '../../../../domain/document/repositories/IDocumentRepository';
import { DocumentId } from '../../../../domain/document/value-objects/DocumentId';
import { UserId } from '../../../../domain/user/value-objects/UserId';
import { NotFoundError, ForbiddenError } from '../../../../domain/errors';
import { DocumentMapper } from '../../../../interfaces/mappers/DocumentMapper';

export class GetDocumentUseCase {
  constructor(private readonly documentRepo: IDocumentRepository) {}

  async execute(req: IRequest): Promise<IResponse> {
    const doc = await this.documentRepo.findById(DocumentId.from(req.documentId));
    if (!doc) throw new NotFoundError('Document not found');
    if (!doc.isOwnedBy(UserId.from(req.requestingUserId))) throw new ForbiddenError('Forbidden');
    return DocumentMapper.toResponse(doc);
  }
}
