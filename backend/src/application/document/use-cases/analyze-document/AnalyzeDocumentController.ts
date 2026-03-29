import { Request, Response, NextFunction } from 'express';
import { AnalyzeDocumentUseCase } from './AnalyzeDocumentUseCase';
import { DocumentMapper } from '../../../../interfaces/mappers/DocumentMapper';

export class AnalyzeDocumentController {
  constructor(private readonly useCase: AnalyzeDocumentUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const document = await this.useCase.execute({
        documentId: req.params.id,
        rawText: req.body.rawText,
      });
      res.json({ success: true, data: DocumentMapper.toResponse(document) });
    } catch (err) {
      next(err);
    }
  };
}
