import { JsonWebTokenError } from 'jsonwebtoken';
import { Either } from '../../../shared/either';
import { RefreshServiceError } from '../errors/refresh.service.error';
import { ITokenManager } from '../utils/token-manager/token-manager.interface';
import { InvalidRefreshTokenError } from '../errors/invalid-refresh-token-error';
import { IRefreshRepository } from '../../../data/repositories/refresh/refresh.repository.interface';
import { IRefreshStorageMemory } from '../../../data/repositories/refresh-storage/refresh-storage.memory.interface';
import { PossibleRefreshAttackerError } from '../errors/possible-refresh-attacker-error';

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

      const stored_refresh_data = await this.refresh_storage.get(user_id);
      if (!stored_refresh_data) {
        return Either.left(new InvalidRefreshTokenError());
      }

      if (stored_refresh_data.refresh_token !== refresh_token) {
        const find_refresh_in_repo = await this.refresh_repository.find_refresh(
          refresh_token,
        );
        if (!find_refresh_in_repo) {
          return Either.left(new InvalidRefreshTokenError());
        }
        return Either.left(new PossibleRefreshAttackerError());
      }

      await this.refresh_repository.insert(stored_refresh_data);

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
