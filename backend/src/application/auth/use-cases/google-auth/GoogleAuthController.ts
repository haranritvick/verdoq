import { Request, Response, NextFunction } from 'express';
import { GoogleAuthUseCase } from './GoogleAuthUseCase';

export class GoogleAuthController {
  constructor(private readonly useCase: GoogleAuthUseCase) {}

  handleCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profile = (req as any).user;
      const result = await this.useCase.execute({
        googleId: profile.googleId,
        email: profile.email,
        name: profile.name,
        avatar: profile.avatar,
      });

      // Set JWT as httpOnly cookie
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Redirect to frontend
      res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${result.token}`);
    } catch (err) {
      next(err);
    }
  };
}
