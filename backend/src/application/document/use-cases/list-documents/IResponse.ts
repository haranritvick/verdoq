export interface DocumentSummary {
  id: string;
  title: string;
  fileType: string;
  riskScore: number | null;
  documentType: string | null;
  createdAt: string;
}

export interface IResponse {
  docs: DocumentSummary[];
  total: number;
  page: number;
}
