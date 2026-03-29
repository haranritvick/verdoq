import { DocumentAnalysis } from '../../../domain/document/entities/Document';

export interface IDocumentAnalyzerPort {
  analyze(rawText: string): Promise<DocumentAnalysis>;
}
