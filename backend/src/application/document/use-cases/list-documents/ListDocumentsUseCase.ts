import { IRequest } from './IRequest';
import { IResponse } from './IResponse';
import { IDocumentRepository } from '../../../../domain/document/repositories/IDocumentRepository';
import { UserId } from '../../../../domain/user/value-objects/UserId';
import { DocumentMapper } from '../../../../interfaces/mappers/DocumentMapper';

export class ListDocumentsUseCase {
  constructor(private readonly documentRepo: IDocumentRepository) {}

  async execute(req: IRequest): Promise<IResponse> {
    const { docs, total } = await this.documentRepo.findByUserId(
      UserId.from(req.userId),
      req.page,
      req.limit,
    );

    return {
      docs: docs.map(DocumentMapper.toSummary),
      total,
      page: req.page,
    };
  }
}
