export interface ITokenPort {
  sign(payload: Record<string, string>): string;
  verify(token: string): Record<string, string>;
}
