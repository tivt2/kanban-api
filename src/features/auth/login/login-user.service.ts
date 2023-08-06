import { IRefreshStorageMemory } from '../../../data/repositories/interfaces/refresh-storage.memory.interface';
import { IUserRepository } from '../../../data/repositories/interfaces/user.repository.interface';
import { Either } from '../../../shared/either';
import { InvalidCredentialsError } from '../error-handler/errors/invalid-credentials-error';
import { LoginUserServiceError } from '../error-handler/errors/login-user.service.error';
import { UserNotFoundError } from '../error-handler/errors/user-not-found-error';
import { IPasswordEncrypter } from '../utils/interfaces/password-encrypter.interface';
import { ITokenManager } from '../utils/interfaces/token-manager.interface';

export class LoginUserService {
  constructor(
    private user_repository: IUserRepository,
    private password_encrypter: IPasswordEncrypter,
    private access_manager: ITokenManager,
    private refresh_manager: ITokenManager,
    private refresh_storage: IRefreshStorageMemory,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<Either<Error, { access_token: string; refresh_token: string }>> {
    try {
      const user = await this.user_repository.find_by_email(email);
      if (!user) {
        return Either.left(
          new UserNotFoundError('Please provide a valid email and password'),
        );
      }

      const do_match = await this.password_encrypter.compare(
        password,
        user.password,
      );
      if (!do_match) {
        return Either.left(
          new InvalidCredentialsError(
            'Please provide a valid email and password',
          ),
        );
      }

      const access_token = await this.access_manager.generate({
        user_id: user.id,
      });
      const refresh_token = await this.refresh_manager.generate({
        user_id: user.id,
      });
      await this.refresh_storage.set(user.id, refresh_token, new Date());

      return Either.right({ access_token, refresh_token });
    } catch (err) {
      throw new LoginUserServiceError();
    }
  }
}
