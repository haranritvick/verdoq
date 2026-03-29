import { IFileParserPort } from '../../application/document/ports/IFileParserPort';
import mammoth from 'mammoth';

export class DocxFileParser implements IFileParserPort {
  async parse(buffer: Buffer, _mimeType: string): Promise<string> {
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value.trim();
    if (!text) throw new Error('Could not extract text from DOCX');
    return text.slice(0, 50000);
  }
}
