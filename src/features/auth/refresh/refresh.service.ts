import { JsonWebTokenError } from 'jsonwebtoken';
import { Either } from '../../../shared/either';
import { RefreshServiceError } from '../error-handler/errors/refresh.service.error';
import { ITokenManager } from '../utils/interfaces/token-manager.interface';
import { InvalidRefreshTokenError } from '../error-handler/errors/invalid-refresh-token-error';

export class RefreshService {
  constructor(
    private refreshManager: ITokenManager,
    private accessManager: ITokenManager,
  ) {}

  async refresh(
    refresh_token: string,
  ): Promise<
    Either<Error, { new_access_token: string; new_refresh_token: string }>
  > {
    try {
      const user_id = await this.refreshManager.verify(refresh_token);

      const new_refresh_token = await this.refreshManager.generate(user_id);
      const new_access_token = await this.accessManager.generate(user_id);

      return Either.right({ new_access_token, new_refresh_token });
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        return Either.left(new InvalidRefreshTokenError());
      }
      throw new RefreshServiceError();
    }
  }
}
