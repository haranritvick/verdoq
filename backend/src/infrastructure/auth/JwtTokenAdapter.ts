import jwt from 'jsonwebtoken';
import { ITokenPort } from '../../application/auth/ports/ITokenPort';

export class JwtTokenAdapter implements ITokenPort {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: string,
  ) {}

  sign(payload: Record<string, string>): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn as any });
  }

  verify(token: string): Record<string, string> {
    return jwt.verify(token, this.secret) as Record<string, string>;
  }
}
