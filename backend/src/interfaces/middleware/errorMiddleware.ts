import { Request, Response, NextFunction } from 'express';
import { NotFoundError, ForbiddenError, ValidationError } from '../../domain/errors';

export const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof NotFoundError) {
    return res.status(404).json({ success: false, error: err.message });
  }
  if (err instanceof ForbiddenError) {
    return res.status(403).json({ success: false, error: err.message });
  }
  if (err instanceof ValidationError) {
    return res.status(400).json({ success: false, error: err.message });
  }
  if (err.message?.includes('Invalid file type')) {
    return res.status(400).json({ success: false, error: err.message });
  }

  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
};
