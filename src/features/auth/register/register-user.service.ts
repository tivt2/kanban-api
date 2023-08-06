import { IUserRepository } from '../../../data/repositories/interfaces/user.repository.interface';
import { TUser } from '../../../models/user.model';
import { RegisterUserServiceError } from '../error-handler/errors/register-user.service.error';
import { IPasswordEncrypter } from '../utils/interfaces/password-encrypter.interface';

export class RegisterUserService {
  constructor(
    private user_repository: IUserRepository,
    private password_encrypter: IPasswordEncrypter,
  ) {}

  async register(email: string, password: string): Promise<TUser> {
    try {
      const hashed_password = await this.password_encrypter.encrypt(password);
      const user = await this.user_repository.insert(email, hashed_password);
      return user;
    } catch (err) {
      throw new RegisterUserServiceError();
    }
  }
}
