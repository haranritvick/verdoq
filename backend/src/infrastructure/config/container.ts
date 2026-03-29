import OpenAI from 'openai';
import { JwtTokenAdapter } from '../auth/JwtTokenAdapter';
import { MongoUserRepository } from '../persistence/repositories/MongoUserRepository';
import { MongoDocumentRepository } from '../persistence/repositories/MongoDocumentRepository';
import { MongoChatRepository } from '../persistence/repositories/MongoChatRepository';
import { OpenAIDocumentAnalyzer } from '../ai/OpenAIDocumentAnalyzer';
import { OpenAIChatAI } from '../ai/OpenAIChatAI';
import { FileParserFactory } from '../parsers/FileParserFactory';

// Use Cases
import { AnalyzeDocumentUseCase } from '../../application/document/use-cases/analyze-document/AnalyzeDocumentUseCase';
import { UploadDocumentUseCase } from '../../application/document/use-cases/upload-document/UploadDocumentUseCase';
import { GetDocumentUseCase } from '../../application/document/use-cases/get-document/GetDocumentUseCase';
import { ListDocumentsUseCase } from '../../application/document/use-cases/list-documents/ListDocumentsUseCase';
import { DeleteDocumentUseCase } from '../../application/document/use-cases/delete-document/DeleteDocumentUseCase';
import { SendMessageUseCase } from '../../application/chat/use-cases/send-message/SendMessageUseCase';
import { GetChatHistoryUseCase } from '../../application/chat/use-cases/get-chat-history/GetChatHistoryUseCase';
import { ClearChatHistoryUseCase } from '../../application/chat/use-cases/clear-chat-history/ClearChatHistoryUseCase';
import { GoogleAuthUseCase } from '../../application/auth/use-cases/google-auth/GoogleAuthUseCase';
import { GetCurrentUserUseCase } from '../../application/auth/use-cases/get-current-user/GetCurrentUserUseCase';

// Controllers
import { UploadDocumentController } from '../../application/document/use-cases/upload-document/UploadDocumentController';
import { AnalyzeDocumentController } from '../../application/document/use-cases/analyze-document/AnalyzeDocumentController';
import { GetDocumentController } from '../../application/document/use-cases/get-document/GetDocumentController';
import { ListDocumentsController } from '../../application/document/use-cases/list-documents/ListDocumentsController';
import { DeleteDocumentController } from '../../application/document/use-cases/delete-document/DeleteDocumentController';
import { SendMessageController } from '../../application/chat/use-cases/send-message/SendMessageController';
import { GetChatHistoryController } from '../../application/chat/use-cases/get-chat-history/GetChatHistoryController';
import { ClearChatHistoryController } from '../../application/chat/use-cases/clear-chat-history/ClearChatHistoryController';
import { GoogleAuthController } from '../../application/auth/use-cases/google-auth/GoogleAuthController';
import { GetCurrentUserController } from '../../application/auth/use-cases/get-current-user/GetCurrentUserController';

export function buildContainer() {
  const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const tokenAdapter = new JwtTokenAdapter(
    process.env.JWT_SECRET!,
    process.env.JWT_EXPIRES_IN || '7d',
  );

  // Repositories
  const userRepo = new MongoUserRepository();
  const documentRepo = new MongoDocumentRepository();
  const chatRepo = new MongoChatRepository();

  // AI Adapters
  const documentAnalyzer = new OpenAIDocumentAnalyzer(openaiClient);
  const chatAI = new OpenAIChatAI(openaiClient);

  // File Parsers
  const fileParserFactory = new FileParserFactory();

  // Use Cases
  const analyzeDocumentUseCase = new AnalyzeDocumentUseCase(documentAnalyzer, documentRepo);
  const uploadDocumentUseCase = new UploadDocumentUseCase(fileParserFactory, documentRepo, analyzeDocumentUseCase);
  const getDocumentUseCase = new GetDocumentUseCase(documentRepo);
  const listDocumentsUseCase = new ListDocumentsUseCase(documentRepo);
  const deleteDocumentUseCase = new DeleteDocumentUseCase(documentRepo, chatRepo);
  const sendMessageUseCase = new SendMessageUseCase(chatRepo, documentRepo, chatAI);
  const getChatHistoryUseCase = new GetChatHistoryUseCase(chatRepo, documentRepo);
  const clearChatHistoryUseCase = new ClearChatHistoryUseCase(chatRepo, documentRepo);
  const googleAuthUseCase = new GoogleAuthUseCase(userRepo, tokenAdapter);
  const getCurrentUserUseCase = new GetCurrentUserUseCase(userRepo, tokenAdapter);

  // Controllers
  const uploadDocumentController = new UploadDocumentController(uploadDocumentUseCase);
  const analyzeDocumentController = new AnalyzeDocumentController(analyzeDocumentUseCase);
  const getDocumentController = new GetDocumentController(getDocumentUseCase);
  const listDocumentsController = new ListDocumentsController(listDocumentsUseCase);
  const deleteDocumentController = new DeleteDocumentController(deleteDocumentUseCase);
  const sendMessageController = new SendMessageController(sendMessageUseCase);
  const getChatHistoryController = new GetChatHistoryController(getChatHistoryUseCase);
  const clearChatHistoryController = new ClearChatHistoryController(clearChatHistoryUseCase);
  const googleAuthController = new GoogleAuthController(googleAuthUseCase);
  const getCurrentUserController = new GetCurrentUserController(getCurrentUserUseCase);

  return {
    tokenAdapter,
    // Document controllers
    uploadDocumentController,
    analyzeDocumentController,
    getDocumentController,
    listDocumentsController,
    deleteDocumentController,
    // Chat controllers
    sendMessageController,
    getChatHistoryController,
    clearChatHistoryController,
    // Auth controllers
    googleAuthController,
    getCurrentUserController,
  };
}
