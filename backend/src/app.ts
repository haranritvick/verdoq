import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import rateLimit from 'express-rate-limit';

import { connectDatabase } from './infrastructure/config/db';
import { configurePassport } from './infrastructure/auth/PassportGoogleStrategy';
import { buildContainer } from './infrastructure/config/container';
import { createAuthRoutes } from './interfaces/routes/authRoutes';
import { createDocumentRoutes } from './interfaces/routes/documentRoutes';
import { createChatRoutes } from './interfaces/routes/chatRoutes';
import { errorMiddleware } from './interfaces/middleware/errorMiddleware';

async function bootstrap() {
  const app = express();
  const port = process.env.PORT || 5000;

  // Connect to MongoDB
  await connectDatabase();

  // Configure Passport
  configurePassport();

  // Global middleware
  app.use(helmet());
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(passport.initialize());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many requests, please try again later.' },
  });
  app.use('/api/', limiter);

  // Build DI container
  const container = buildContainer();

  // Mount routes
  app.use('/api/auth', createAuthRoutes(
    container.googleAuthController,
    container.getCurrentUserController,
    container.tokenAdapter,
  ));
  app.use('/api/documents', createDocumentRoutes(
    container.uploadDocumentController,
    container.getDocumentController,
    container.listDocumentsController,
    container.deleteDocumentController,
    container.tokenAdapter,
  ));
  app.use('/api/chat', createChatRoutes(
    container.sendMessageController,
    container.getChatHistoryController,
    container.clearChatHistoryController,
    container.tokenAdapter,
  ));

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ success: true, message: 'Verdoq API is running', timestamp: new Date().toISOString() });
  });

  // Error handler (must be last)
  app.use(errorMiddleware);

  app.listen(port, () => {
    console.log(`🚀 Verdoq API running on http://localhost:${port}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
