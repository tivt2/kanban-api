import { IUserRepository } from '../../../data/repositories/interfaces/user-repository.interface';
import { Either } from '../../../shared/Either';
import { InvalidCredentialsError } from '../error-handler/errors/invalid-credentials-error';
import { LoginUserServiceError } from '../error-handler/errors/login-user.service.error';
import { UserNotFoundError } from '../error-handler/errors/user-not-found-error';
import { IPasswordEncrypter } from '../utils/interfaces/password-encrypter.interface';
import { ITokenManager } from '../utils/interfaces/token-manager.interface';

export class LoginUserService {
  constructor(
    private userRepo: IUserRepository,
    private passEncrypt: IPasswordEncrypter,
    private tokenManager: ITokenManager,
  ) {}

  async login(email: string, password: string): Promise<Either<Error, string>> {
    try {
      const user = await this.userRepo.findByEmail(email);
      if (!user) {
        return Either.left(
          new UserNotFoundError('Please provide a valid email and password'),
        );
      }

      const doMatch = this.passEncrypt.compare(password, user.password);
      if (!doMatch) {
        return Either.left(
          new InvalidCredentialsError(
            'Please provide a valid email and password',
          ),
        );
      }

      const token = await this.tokenManager.generate({ userId: user.id });
      return Either.right(token);
    } catch (err) {
      throw new LoginUserServiceError();
    }
  }
}
