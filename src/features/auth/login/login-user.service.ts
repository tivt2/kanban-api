import { IUserRepository } from '../../../data/repositories/interfaces/user.repository.interface';
import { Either } from '../../../shared/either';
import { InvalidCredentialsError } from '../error-handler/errors/invalid-credentials-error';
import { LoginUserServiceError } from '../error-handler/errors/login-user.service.error';
import { UserNotFoundError } from '../error-handler/errors/user-not-found-error';
import { IPasswordEncrypter } from '../utils/interfaces/password-encrypter.interface';
import { ITokenManager } from '../utils/interfaces/token-manager.interface';

export class LoginUserService {
  constructor(
    private userRepo: IUserRepository,
    private passEncrypt: IPasswordEncrypter,
    private accessManager: ITokenManager,
    private refreshManager: ITokenManager,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<Either<Error, { access_token: string; refresh_token: string }>> {
    try {
      const user = await this.userRepo.findByEmail(email);
      if (!user) {
        return Either.left(
          new UserNotFoundError('Please provide a valid email and password'),
        );
      }

      const doMatch = await this.passEncrypt.compare(password, user.password);
      if (!doMatch) {
        return Either.left(
          new InvalidCredentialsError(
            'Please provide a valid email and password',
          ),
        );
      }

      const access_token = await this.accessManager.generate({
        user_id: user.id,
      });
      const refresh_token = await this.refreshManager.generate({
        user_id: user.id,
      });
      return Either.right({ access_token, refresh_token });
    } catch (err) {
      throw new LoginUserServiceError();
    }
  }
}
