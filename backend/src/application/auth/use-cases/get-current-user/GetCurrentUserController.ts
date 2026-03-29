import { Request, Response, NextFunction } from 'express';
import { GetCurrentUserUseCase } from './GetCurrentUserUseCase';

export class GetCurrentUserController {
  constructor(private readonly useCase: GetCurrentUserUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.useCase.execute((req as any).user!.userId);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };
}
