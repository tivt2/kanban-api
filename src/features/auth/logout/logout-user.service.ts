import { Either } from '../../../shared/Either';
import { InvalidRefreshTokenError } from '../error-handler/errors/invalid-refresh-token-error';
import { ITokenManager } from '../utils/interfaces/token-manager.interface';

export class LogoutUserService {
  constructor(private refreshManager: ITokenManager) {}

  async logout(refresh_token: string): Promise<Either<Error, string>> {
    // needs in-memory repository to invalidate refresh token
    const payload = await this.refreshManager.verify(refresh_token);
    if (!payload) {
      return Either.left(new InvalidRefreshTokenError());
    }

    return Either.right(payload.user_id);
  }
}
