import { IUserRepository } from '../../../data/repositories/interfaces/user.repository.interface';
import { TUser } from '../../../models/user.model';
import { RegisterUserServiceError } from '../error-handler/errors/register-user.service.error';
import { IPasswordEncrypter } from '../utils/interfaces/password-encrypter.interface';

export class RegisterUserService {
  constructor(
    private userRepo: IUserRepository,
    private passEncrypt: IPasswordEncrypter,
  ) {}

  async register(email: string, password: string): Promise<TUser> {
    try {
      const hashedPassword = await this.passEncrypt.encrypt(password);
      const user = await this.userRepo.insert(email, hashedPassword);
      return user;
    } catch (err) {
      throw new RegisterUserServiceError();
    }
  }
}
