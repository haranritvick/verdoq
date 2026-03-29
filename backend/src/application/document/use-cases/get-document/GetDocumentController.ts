import { Request, Response, NextFunction } from 'express';
import { GetDocumentUseCase } from './GetDocumentUseCase';

export class GetDocumentController {
  constructor(private readonly useCase: GetDocumentUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.useCase.execute({
        documentId: req.params.id,
        requestingUserId: (req as any).user!.userId,
      });
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };
}
