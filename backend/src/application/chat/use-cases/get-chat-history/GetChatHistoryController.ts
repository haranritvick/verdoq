import { Request, Response, NextFunction } from 'express';
import { GetChatHistoryUseCase } from './GetChatHistoryUseCase';

export class GetChatHistoryController {
  constructor(private readonly useCase: GetChatHistoryUseCase) {}

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
