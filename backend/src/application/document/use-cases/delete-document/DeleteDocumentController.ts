import { Request, Response, NextFunction } from 'express';
import { DeleteDocumentUseCase } from './DeleteDocumentUseCase';

export class DeleteDocumentController {
  constructor(private readonly useCase: DeleteDocumentUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.useCase.execute({
        documentId: req.params.id,
        requestingUserId: (req as any).user!.userId,
      });
      res.json({ success: true, message: 'Document deleted' });
    } catch (err) {
      next(err);
    }
  };
}
