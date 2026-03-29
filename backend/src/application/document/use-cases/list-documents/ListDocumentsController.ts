import { Request, Response, NextFunction } from 'express';
import { ListDocumentsUseCase } from './ListDocumentsUseCase';

export class ListDocumentsController {
  constructor(private readonly useCase: ListDocumentsUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.useCase.execute({
        userId: (req as any).user!.userId,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
      });
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };
}
