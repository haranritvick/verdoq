import { Router } from 'express';
import { z } from 'zod';
import { SendMessageController } from '../../application/chat/use-cases/send-message/SendMessageController';
import { GetChatHistoryController } from '../../application/chat/use-cases/get-chat-history/GetChatHistoryController';
import { ClearChatHistoryController } from '../../application/chat/use-cases/clear-chat-history/ClearChatHistoryController';
import { createAuthMiddleware } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validateMiddleware';
import { JwtTokenAdapter } from '../../infrastructure/auth/JwtTokenAdapter';

const sendMessageSchema = z.object({
  content: z.string().min(1).max(4000),
});

export function createChatRoutes(
  sendMessageController: SendMessageController,
  getChatHistoryController: GetChatHistoryController,
  clearChatHistoryController: ClearChatHistoryController,
  tokenAdapter: JwtTokenAdapter,
): Router {
  const router = Router();
  const auth = createAuthMiddleware(tokenAdapter);

  // Send a message, get AI reply
  router.post('/:documentId', auth, validateBody(sendMessageSchema), sendMessageController.handle);

  // Get full chat history for a document
  router.get('/:documentId', auth, getChatHistoryController.handle);

  // Clear chat history for a document
  router.delete('/:documentId', auth, clearChatHistoryController.handle);

  return router;
}
