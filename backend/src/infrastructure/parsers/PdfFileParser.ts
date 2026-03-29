import { IFileParserPort } from '../../application/document/ports/IFileParserPort';
import pdfParse from 'pdf-parse';

export class PdfFileParser implements IFileParserPort {
  async parse(buffer: Buffer, _mimeType: string): Promise<string> {
    const result = await pdfParse(buffer);
    const text = result.text.trim();
    if (!text) throw new Error('Could not extract text from PDF');
    return text.slice(0, 50000);
  }
}
