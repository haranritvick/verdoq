import { Document, DocumentAnalysis } from '../../domain/document/entities/Document';

export class DocumentMapper {
  static toResponse(doc: Document): any {
    return {
      id: doc.id.toString(),
      title: doc.title,
      fileType: doc.fileType,
      originalText: doc.originalText,
      analysis: doc.analysis
        ? {
            summary: doc.analysis.summary,
            documentType: doc.analysis.documentType,
            riskScore: doc.analysis.riskScore.toNumber(),
            sections: doc.analysis.sections.map((s) => ({
              title: s.title,
              plainText: s.plainText,
              originalText: s.originalText,
            })),
            redFlags: doc.analysis.redFlags.map((rf) => ({
              clause: rf.clause,
              explanation: rf.explanation,
              severity: rf.severity,
            })),
          }
        : null,
      createdAt: doc.createdAt.toISOString(),
    };
  }

  static toSummary(doc: Document): any {
    return {
      id: doc.id.toString(),
      title: doc.title,
      fileType: doc.fileType,
      riskScore: doc.analysis ? doc.analysis.riskScore.toNumber() : null,
      documentType: doc.analysis ? doc.analysis.documentType : null,
      createdAt: doc.createdAt.toISOString(),
    };
  }

  static toPersistence(doc: Document): any {
    return {
      _id: doc.id.toString(),
      userId: doc.userId.toString(),
      title: doc.title,
      originalText: doc.originalText,
      fileType: doc.fileType,
      analysis: doc.analysis
        ? {
            summary: doc.analysis.summary,
            documentType: doc.analysis.documentType,
            riskScore: doc.analysis.riskScore.toNumber(),
            sections: doc.analysis.sections.map((s) => ({
              title: s.title,
              plainText: s.plainText,
              originalText: s.originalText,
            })),
            redFlags: doc.analysis.redFlags.map((rf) => ({
              clause: rf.clause,
              explanation: rf.explanation,
              severity: rf.severity,
            })),
          }
        : null,
      createdAt: doc.createdAt,
    };
  }

  static toDomain(raw: any): Document {
    const { DocumentId } = require('../../domain/document/value-objects/DocumentId');
    const { UserId } = require('../../domain/user/value-objects/UserId');
    const { RiskScore } = require('../../domain/document/value-objects/RiskScore');
    const { RedFlag } = require('../../domain/document/value-objects/RedFlag');
    const { DocumentSection } = require('../../domain/document/value-objects/DocumentSection');

    let analysis: DocumentAnalysis | null = null;
    if (raw.analysis) {
      analysis = {
        summary: raw.analysis.summary,
        documentType: raw.analysis.documentType,
        sections: raw.analysis.sections.map((s: any) => DocumentSection.create(s)),
        redFlags: raw.analysis.redFlags.map((rf: any) => RedFlag.create(rf)),
        riskScore: RiskScore.create(raw.analysis.riskScore),
      };
    }

    return new Document(
      DocumentId.from(raw._id.toString()),
      UserId.from(raw.userId.toString()),
      raw.title,
      raw.originalText,
      raw.fileType,
      analysis,
      raw.createdAt,
    );
  }
}
