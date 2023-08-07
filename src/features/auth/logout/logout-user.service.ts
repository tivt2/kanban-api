import { JsonWebTokenError } from 'jsonwebtoken';
import { Either } from '../../../shared/either';
import { InvalidRefreshTokenError } from '../errors/invalid-refresh-token-error';
import { LogoutUserServiceError } from '../errors/logout-user.service.error';
import { ITokenManager } from '../utils/token-manager/token-manager.interface';
import { IRefreshStorageMemory } from '../../../data/repositories/refresh-storage/refresh-storage.memory.interface';
import { IRefreshRepository } from '../../../data/repositories/refresh/refresh.repository.interface';

export class LogoutUserService {
  constructor(
    private refreshManager: ITokenManager,
    private refresh_repository: IRefreshRepository,
    private refresh_storage: IRefreshStorageMemory,
  ) {}

  async logout(refresh_token: string): Promise<Either<Error, string>> {
    try {
      const payload = await this.refreshManager.verify(refresh_token);

      const refresh_data = await this.refresh_storage.remove(payload.user_id);
      if (!refresh_data) {
        return Either.left(new InvalidRefreshTokenError());
      }

      await this.refresh_repository.delete_all_user_refreshes(payload.user_id);

      return Either.right(payload.user_id);
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        return Either.left(new InvalidRefreshTokenError());
      }
      throw new LogoutUserServiceError();
    }
  }
}
