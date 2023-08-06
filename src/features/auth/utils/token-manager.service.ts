import jwt from 'jsonwebtoken';
import { ITokenManager } from './interfaces/token-manager.interface';

export class TokenManager implements ITokenManager {
  constructor(private secret: string, private expires_in_ms: number) {}

  async generate(payload: { user_id: string }): Promise<string> {
    const token = jwt.sign(payload, this.secret, {
      expiresIn: this.expires_in_ms / 1000,
    });
    return token;
  }

  async verify(token: string): Promise<{ user_id: string }> {
    const payload = jwt.verify(token, this.secret) as { user_id: string };
    return payload;
  }
}
