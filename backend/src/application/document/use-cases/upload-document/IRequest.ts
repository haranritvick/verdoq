export interface IRequest {
  userId: string;
  fileBuffer: Buffer;
  mimeType: string;
  filename: string;
}
