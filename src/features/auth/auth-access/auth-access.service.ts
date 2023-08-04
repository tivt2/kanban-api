import { JsonWebTokenError } from 'jsonwebtoken';
import { Either } from '../../../shared/Either';
import { ITokenManager } from '../utils/interfaces/token-manager.interface';
import { InvalidAccessTokenError } from '../error-handler/errors/InvalidAccessTokenError';
import { AuthAccessServiceError } from '../error-handler/errors/auth-access.service.error';

export class AuthAccessService {
  constructor(private accessManager: ITokenManager) {}

  async authorize(token: string): Promise<Either<Error, string>> {
    try {
      const payload = await this.accessManager.verify(token);
      return Either.right(payload.user_id);
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        return Either.left(new InvalidAccessTokenError());
      }
      throw new AuthAccessServiceError();
    }
  }
}
