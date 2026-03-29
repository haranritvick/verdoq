import { IRequest } from './IRequest';
import { IResponse } from './IResponse';
import { IFileParserPort } from '../../ports/IFileParserPort';
import { IDocumentRepository } from '../../../../domain/document/repositories/IDocumentRepository';
import { AnalyzeDocumentUseCase } from '../analyze-document/AnalyzeDocumentUseCase';
import { Document } from '../../../../domain/document/entities/Document';
import { FileType } from '../../../../domain/document/value-objects/FileType';
import { UserId } from '../../../../domain/user/value-objects/UserId';
import { DocumentMapper } from '../../../../interfaces/mappers/DocumentMapper';

export class UploadDocumentUseCase {
  constructor(
    private readonly fileParser: IFileParserPort,
    private readonly documentRepo: IDocumentRepository,
    private readonly analyzeUseCase: AnalyzeDocumentUseCase,
  ) {}

  async execute(req: IRequest): Promise<IResponse> {
    // 1. Parse raw file bytes → plain text
    const rawText = await this.fileParser.parse(req.fileBuffer, req.mimeType);

    // 2. Create domain entity (validation happens inside)
    const document = Document.create({
      userId: UserId.from(req.userId),
      title: req.filename,
      originalText: rawText,
      fileType: FileType.fromMimeType(req.mimeType),
    });

    // 3. Persist immediately (user sees it "uploaded" before analysis completes)
    await this.documentRepo.save(document);

    // 4. Run AI analysis (may take 5–15 seconds)
    const analyzed = await this.analyzeUseCase.execute({
      documentId: document.id.toString(),
      rawText: document.originalText,
    });

    return DocumentMapper.toResponse(analyzed);
  }
}
