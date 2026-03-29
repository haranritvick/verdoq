import { createWorker } from 'tesseract.js';
import { IFileParserPort } from '../../application/document/ports/IFileParserPort';

export class ImageFileParser implements IFileParserPort {
  async parse(buffer: Buffer, _mimeType: string): Promise<string> {
    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize(buffer);
    await worker.terminate();

    const trimmedText = text.trim();
    if (!trimmedText) throw new Error('Could not extract text from image');

    return trimmedText.slice(0, 50000);
  }
}
