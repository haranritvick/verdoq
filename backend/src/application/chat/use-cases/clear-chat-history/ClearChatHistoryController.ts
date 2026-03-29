import { Request, Response, NextFunction } from 'express';
import { ClearChatHistoryUseCase } from './ClearChatHistoryUseCase';

export class ClearChatHistoryController {
  constructor(private readonly useCase: ClearChatHistoryUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.useCase.execute({
        documentId: req.params.documentId,
        userId: (req as any).user!.userId,
      });
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };
}
