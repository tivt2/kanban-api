import { ITokenManager } from '../interfaces/token-manager.interface';

export class TokenManagerSpy implements ITokenManager {
  payload = {};
  shouldThrow = false;

  constructor(private secret: string) {}
  async generate(payload: { userId: string }): Promise<string> {
    if (this.shouldThrow) {
      throw new Error();
    }
    this.payload = payload;
    return 'valid_access_token';
  }
}
