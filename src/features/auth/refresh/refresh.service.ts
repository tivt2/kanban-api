import { JsonWebTokenError } from 'jsonwebtoken';
import { Either } from '../../../shared/either';
import { RefreshServiceError } from '../error-handler/errors/refresh.service.error';
import { ITokenManager } from '../utils/interfaces/token-manager.interface';
import { InvalidRefreshTokenError } from '../error-handler/errors/invalid-refresh-token-error';
import { IRefreshRepository } from '../../../data/repositories/interfaces/refresh.repository.interface';
import { IRefreshStorageMemory } from '../../../data/repositories/interfaces/refresh-storage.memory.interface';

export class RefreshService {
  constructor(
    private refresh_manager: ITokenManager,
    private access_manager: ITokenManager,
    private refresh_repository: IRefreshRepository,
    private refresh_storage: IRefreshStorageMemory,
  ) {}

  async refresh(
    refresh_token: string,
  ): Promise<
    Either<Error, { new_access_token: string; new_refresh_token: string }>
  > {
    try {
      const { user_id } = await this.refresh_manager.verify(refresh_token);

      const refresh_data = await this.refresh_storage.get(user_id);
      if (!refresh_data) {
        return Either.left(new InvalidRefreshTokenError());
      }

      await this.refresh_repository.insert(refresh_data);

      const new_refresh_token = await this.refresh_manager.generate({
        user_id,
      });
      const new_access_token = await this.access_manager.generate({ user_id });

      await this.refresh_storage.set(user_id, new_refresh_token, new Date());

      return Either.right({ new_access_token, new_refresh_token });
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        return Either.left(new InvalidRefreshTokenError());
      }
      throw new RefreshServiceError();
    }
  }
}
