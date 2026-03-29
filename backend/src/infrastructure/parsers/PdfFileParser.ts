import { IFileParserPort } from '../../application/document/ports/IFileParserPort';
import pdfParse from 'pdf-parse';
import { createWorker } from 'tesseract.js';

export class PdfFileParser implements IFileParserPort {
  async parse(buffer: Buffer, _mimeType: string): Promise<string> {
    // 1. Try normal text extraction first (digital PDFs)
    try {
      const result = await pdfParse(buffer);
      const text = result.text.trim();
      if (text && text.length > 50) {
        return text.slice(0, 50000);
      }
    } catch {
      // pdf-parse failed — likely a scanned/image PDF, fall through to OCR
    }

    // 2. Fallback: Convert PDF pages to images and run OCR
    console.log('⚠️  No text layer found in PDF — falling back to OCR...');
    const { pdf } = await import('pdf-to-img');
    const pages = await pdf(buffer, { scale: 2.0 });

    const worker = await createWorker('eng');
    const extractedTexts: string[] = [];

    let pageNum = 0;
    for await (const pageImage of pages) {
      pageNum++;
      // pageImage is a Uint8Array (PNG buffer)
      const imageBuffer = Buffer.from(pageImage);
      const { data: { text } } = await worker.recognize(imageBuffer);
      if (text.trim()) {
        extractedTexts.push(text.trim());
      }
      // Limit to first 10 pages for performance
      if (pageNum >= 10) break;
    }

    await worker.terminate();

    const fullText = extractedTexts.join('\n\n');
    if (!fullText) throw new Error('Could not extract text from PDF (neither text layer nor OCR)');

    return fullText.slice(0, 50000);
  }
}
