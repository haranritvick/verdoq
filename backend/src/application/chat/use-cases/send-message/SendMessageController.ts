import { Request, Response, NextFunction } from 'express';
import { SendMessageUseCase } from './SendMessageUseCase';

export class SendMessageController {
  constructor(private readonly useCase: SendMessageUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.useCase.execute({
        documentId: req.params.documentId,
        userId: (req as any).user!.userId,
        content: req.body.content,
      });
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };
}
