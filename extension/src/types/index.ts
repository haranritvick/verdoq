export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export interface DocumentAnalysis {
  summary: string;
  documentType: string;
  riskScore: number;
  sections: DocumentSection[];
  redFlags: RedFlag[];
}

export interface DocumentSection {
  title: string;
  plainText: string;
  originalText: string;
}

export interface RedFlag {
  clause: string;
  explanation: string;
  severity: 'low' | 'medium' | 'high';
}

export interface DocumentSummary {
  id: string;
  title: string;
  fileType: string;
  riskScore: number | null;
  documentType: string | null;
  createdAt: string;
}

export interface DocumentFull {
  id: string;
  title: string;
  fileType: string;
  originalText: string;
  analysis: DocumentAnalysis | null;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  docs: T[];
  total: number;
  page: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
