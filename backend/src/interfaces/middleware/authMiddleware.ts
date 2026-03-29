import { Request, Response, NextFunction } from 'express';
import { JwtTokenAdapter } from '../../infrastructure/auth/JwtTokenAdapter';

export function createAuthMiddleware(tokenAdapter: JwtTokenAdapter) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check for token in cookie, Authorization header, or query param
      let token = req.cookies?.token;

      if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith('Bearer ')) {
          token = authHeader.slice(7);
        }
      }

      if (!token) {
        token = req.query.token as string;
      }

      if (!token) {
        return res.status(401).json({ success: false, error: 'Authentication required' });
      }

      const payload = tokenAdapter.verify(token);
      (req as any).user = { userId: payload.userId, email: payload.email };
      next();
    } catch (err) {
      return res.status(401).json({ success: false, error: 'Invalid or expired token' });
    }
  };
}
