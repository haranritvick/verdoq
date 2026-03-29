import { DocumentId } from '../value-objects/DocumentId';
import { RiskScore } from '../value-objects/RiskScore';
import { RedFlag } from '../value-objects/RedFlag';
import { DocumentSection } from '../value-objects/DocumentSection';
import { FileType } from '../value-objects/FileType';
import { UserId } from '../../user/value-objects/UserId';

export interface DocumentAnalysis {
  summary: string;
  documentType: string;
  sections: DocumentSection[];
  redFlags: RedFlag[];
  riskScore: RiskScore;
}

export interface CreateDocumentProps {
  userId: UserId;
  title: string;
  originalText: string;
  fileType: FileType;
}

export class Document {
  constructor(
    public readonly id: DocumentId,
    public readonly userId: UserId,
    public title: string,
    public originalText: string,
    public fileType: FileType,
    public analysis: DocumentAnalysis | null,
    public readonly createdAt: Date,
  ) {}

  static create(props: CreateDocumentProps): Document {
    if (!props.originalText || props.originalText.trim().length === 0)
      throw new Error('Document text cannot be empty');
    if (props.originalText.length > 50000)
      throw new Error('Document exceeds 50,000 character limit');
    return new Document(
      DocumentId.generate(),
      props.userId,
      props.title,
      props.originalText,
      props.fileType,
      null,
      new Date(),
    );
  }

  applyAnalysis(analysis: DocumentAnalysis): void {
    this.analysis = analysis;
  }

  isOwnedBy(userId: UserId): boolean {
    return this.userId.equals(userId);
  }
}
