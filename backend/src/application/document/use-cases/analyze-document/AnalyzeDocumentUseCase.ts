import { IRequest } from './IRequest';
import { IDocumentAnalyzerPort } from '../../ports/IDocumentAnalyzerPort';
import { IDocumentRepository } from '../../../../domain/document/repositories/IDocumentRepository';
import { DocumentId } from '../../../../domain/document/value-objects/DocumentId';
import { NotFoundError } from '../../../../domain/errors';
import { Document } from '../../../../domain/document/entities/Document';

export class AnalyzeDocumentUseCase {
  constructor(
    private readonly analyzer: IDocumentAnalyzerPort,
    private readonly documentRepo: IDocumentRepository,
  ) {}

  async execute(req: IRequest): Promise<Document> {
    const document = await this.documentRepo.findById(DocumentId.from(req.documentId));
    if (!document) throw new NotFoundError('Document not found');

    // Call AI port — infrastructure concern hidden behind interface
    const analysis = await this.analyzer.analyze(req.rawText);

    // Apply analysis to domain entity
    document.applyAnalysis(analysis);
    await this.documentRepo.save(document);

    return document;
  }
}
