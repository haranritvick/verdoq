import { Router } from 'express';
import passport from 'passport';
import { GoogleAuthController } from '../../application/auth/use-cases/google-auth/GoogleAuthController';
import { GetCurrentUserController } from '../../application/auth/use-cases/get-current-user/GetCurrentUserController';
import { createAuthMiddleware } from '../middleware/authMiddleware';
import { JwtTokenAdapter } from '../../infrastructure/auth/JwtTokenAdapter';

export function createAuthRoutes(
  googleAuthController: GoogleAuthController,
  getCurrentUserController: GetCurrentUserController,
  tokenAdapter: JwtTokenAdapter,
): Router {
  const router = Router();

  // Redirect to Google OAuth
  router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }));

  // Google OAuth callback
  router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    googleAuthController.handleCallback,
  );

  // Get current user (requires auth)
  router.get('/me', createAuthMiddleware(tokenAdapter), getCurrentUserController.handle);

  // Logout
  router.post('/logout', (_req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out' });
  });

  return router;
}
