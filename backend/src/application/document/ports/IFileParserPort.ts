export interface IFileParserPort {
  parse(buffer: Buffer, mimeType: string): Promise<string>;
}
