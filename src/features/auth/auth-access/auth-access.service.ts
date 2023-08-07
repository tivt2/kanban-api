import { JsonWebTokenError } from 'jsonwebtoken';
import { Either } from '../../../shared/either';
import { ITokenManager } from '../utils/token-manager/token-manager.interface';
import { InvalidAccessTokenError } from '../errors/Invalid-access-token-error';
import { AuthAccessServiceError } from '../errors/auth-access.service.error';

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
