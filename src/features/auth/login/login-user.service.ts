import { IUserRepository } from '../../../data/repositories/interfaces/user-repository.interface';
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

  async login(email: string, password: string) {
    try {
      const user = await this.userRepo.findByEmail(email);
      if (!user) {
        throw new UserNotFoundError(
          'Please provide a valid email and password',
        );
      }

      const doMatch = this.passEncrypt.compare(password, user.password);
      if (!doMatch) {
        throw new InvalidCredentialsError(
          'Please provide a valid email and password',
        );
      }

      const token = this.tokenManager.generate({ userId: user.id });
      return token;
    } catch (err) {
      if (err instanceof (UserNotFoundError || InvalidCredentialsError)) {
        throw err;
      }
      throw new LoginUserServiceError();
    }
  }
}
