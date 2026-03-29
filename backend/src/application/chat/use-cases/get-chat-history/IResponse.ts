export interface ChatMessageResponse {
  id: string;
  role: string;
  content: string;
  createdAt: string;
}

export interface IResponse {
  messages: ChatMessageResponse[];
}
