import { JsonWebTokenError } from 'jsonwebtoken';
import { ITokenManager } from '../interfaces/token-manager.interface';

export class TokenManagerSpy implements ITokenManager {
  payload = {};
  shouldThrow = false;
  jsonError = true;

  constructor(private secret: string) {}
  async generate(payload: { user_id: string }): Promise<string> {
    if (this.shouldThrow) {
      throw new Error();
    }
    this.payload = payload;
    return 'valid_access_token';
  }
  async verify(token: string): Promise<{ user_id: string }> {
    if (this.shouldThrow) {
      if (this.jsonError) {
        throw new JsonWebTokenError('token_error');
      }
      throw new Error();
    }
    this.payload = { user_id: token };
    return this.payload as { user_id: string };
  }
}
