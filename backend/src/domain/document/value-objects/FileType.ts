export enum FileType {
  PDF = 'pdf',
  DOCX = 'docx',
  TEXT = 'text',
}

export namespace FileType {
  export function fromMimeType(mimeType: string): FileType {
    switch (mimeType) {
      case 'application/pdf':
        return FileType.PDF;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return FileType.DOCX;
      case 'text/plain':
        return FileType.TEXT;
      default:
        throw new Error(`Unsupported file type: ${mimeType}`);
    }
  }
}
