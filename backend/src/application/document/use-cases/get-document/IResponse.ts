export interface IResponse {
  id: string;
  title: string;
  fileType: string;
  originalText: string;
  analysis: {
    summary: string;
    documentType: string;
    riskScore: number;
    sections: { title: string; plainText: string; originalText: string }[];
    redFlags: { clause: string; explanation: string; severity: 'low' | 'medium' | 'high' }[];
  } | null;
  createdAt: string;
}
