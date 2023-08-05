import { JsonWebTokenError } from 'jsonwebtoken';
import { Either } from '../../../shared/Either';
import { InvalidRefreshTokenError } from '../error-handler/errors/invalid-refresh-token-error';
import { LogoutUserServiceError } from '../error-handler/errors/logout-user.service.error';
import { ITokenManager } from '../utils/interfaces/token-manager.interface';

export class LogoutUserService {
  constructor(private refreshManager: ITokenManager) {}

  async logout(refresh_token: string): Promise<Either<Error, string>> {
    try {
      const payload = await this.refreshManager.verify(refresh_token);
      // needs in-memory repository to invalidate refresh token

      return Either.right(payload.user_id);
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        return Either.left(new InvalidRefreshTokenError());
      }
      throw new LogoutUserServiceError();
    }
  }
}
