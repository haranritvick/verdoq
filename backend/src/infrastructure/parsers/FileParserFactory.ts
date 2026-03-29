import { IFileParserPort } from '../../application/document/ports/IFileParserPort';
import { PdfFileParser } from './PdfFileParser';
import { DocxFileParser } from './DocxFileParser';

export class FileParserFactory {
  private readonly pdfParser = new PdfFileParser();
  private readonly docxParser = new DocxFileParser();

  getParser(mimeType: string): IFileParserPort {
    switch (mimeType) {
      case 'application/pdf':
        return this.pdfParser;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return this.docxParser;
      default:
        throw new Error(`No parser available for MIME type: ${mimeType}`);
    }
  }

  async parse(buffer: Buffer, mimeType: string): Promise<string> {
    // Handle plain text directly
    if (mimeType === 'text/plain') {
      return buffer.toString('utf-8').slice(0, 50000);
    }
    const parser = this.getParser(mimeType);
    return parser.parse(buffer, mimeType);
  }
}
