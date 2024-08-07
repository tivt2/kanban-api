import { IUserRepository } from '../../../data/repositories/user/user.repository.interface';
import { UserModel } from '../../../models/user.model';
import { Either } from '../../../shared/either';
import { EmailTakenError } from '../errors/email-taken-error';
import { RegisterUserServiceError } from '../errors/register-user.service.error';
import { IPasswordEncrypter } from '../utils/password-encrypter/password-encrypter.interface';

export class RegisterUserService {
  constructor(
    private user_repository: IUserRepository,
    private password_encrypter: IPasswordEncrypter,
  ) {}

  async register(
    email: string,
    password: string,
  ): Promise<Either<Error, UserModel>> {
    try {
      const user = await this.user_repository.find_by_email(email);
      if (user) {
        return Either.left(new EmailTakenError());
      }
      const hashed_password = await this.password_encrypter.encrypt(password);
      const created_user = await this.user_repository.insert(
        email,
        hashed_password,
      );
      return Either.right(created_user);
    } catch (err) {
      throw new RegisterUserServiceError();
    }
  }
}
