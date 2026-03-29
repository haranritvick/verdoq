import { Router } from 'express';
import { z } from 'zod';
import { UploadDocumentController } from '../../application/document/use-cases/upload-document/UploadDocumentController';
import { GetDocumentController } from '../../application/document/use-cases/get-document/GetDocumentController';
import { ListDocumentsController } from '../../application/document/use-cases/list-documents/ListDocumentsController';
import { DeleteDocumentController } from '../../application/document/use-cases/delete-document/DeleteDocumentController';
import { createAuthMiddleware } from '../middleware/authMiddleware';
import { uploadMiddleware } from '../middleware/uploadMiddleware';
import { validateBody } from '../middleware/validateMiddleware';
import { JwtTokenAdapter } from '../../infrastructure/auth/JwtTokenAdapter';
import { FileParserFactory } from '../../infrastructure/parsers/FileParserFactory';

const textSubmitSchema = z.object({
  text: z.string().min(1).max(50000),
  title: z.string().min(1).max(200).optional(),
});

export function createDocumentRoutes(
  uploadController: UploadDocumentController,
  getController: GetDocumentController,
  listController: ListDocumentsController,
  deleteController: DeleteDocumentController,
  tokenAdapter: JwtTokenAdapter,
): Router {
  const router = Router();
  const auth = createAuthMiddleware(tokenAdapter);
  const fileParserFactory = new FileParserFactory();

  // Upload file (PDF/DOCX)
  router.post('/upload', auth, uploadMiddleware.single('file'), uploadController.handle);

  // Extract text only (no AI analysis) — used for multi-file merge
  router.post('/extract', auth, uploadMiddleware.single('file'), async (req, res, next) => {
    try {
      const file = req.file;
      if (!file) {
        res.status(400).json({ success: false, error: 'No file provided' });
        return;
      }
      const text = await fileParserFactory.parse(file.buffer, file.mimetype);
      res.json({ success: true, data: { text, filename: file.originalname } });
    } catch (err) {
      next(err);
    }
  });

  // Submit raw pasted text
  router.post('/text', auth, validateBody(textSubmitSchema), async (req, res, next) => {
    try {
      const { text, title } = req.body;
      // Convert text to a buffer and simulate file upload
      const buffer = Buffer.from(text, 'utf-8');
      (req as any).file = {
        buffer,
        mimetype: 'text/plain',
        originalname: title || text.slice(0, 60).replace(/[^a-zA-Z0-9 ]/g, '') + '.txt',
      };
      await uploadController.handle(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  // List all user's documents (paginated)
  router.get('/', auth, listController.handle);

  // Get single document + full analysis
  router.get('/:id', auth, getController.handle);

  // Delete document + its chat history
  router.delete('/:id', auth, deleteController.handle);

  return router;
}
