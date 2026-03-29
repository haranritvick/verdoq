import { Request, Response, NextFunction } from 'express';
import { UploadDocumentUseCase } from './UploadDocumentUseCase';

export class UploadDocumentController {
  constructor(private readonly useCase: UploadDocumentUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.useCase.execute({
        userId: (req as any).user!.userId,
        fileBuffer: req.file!.buffer,
        mimeType: req.file!.mimetype,
        filename: req.file!.originalname,
      });
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };
}
