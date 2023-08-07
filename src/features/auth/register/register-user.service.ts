import { IUserRepository } from '../../../data/repositories/interfaces/user.repository.interface';
import { TUser } from '../../../models/user.model';
import { Either } from '../../../shared/either';
import { EmailTakenError } from '../error-handler/errors/email-taken-error';
import { RegisterUserServiceError } from '../error-handler/errors/register-user.service.error';
import { IPasswordEncrypter } from '../utils/interfaces/password-encrypter.interface';

export class RegisterUserService {
  constructor(
    private user_repository: IUserRepository,
    private password_encrypter: IPasswordEncrypter,
  ) {}

  async register(
    email: string,
    password: string,
  ): Promise<Either<Error, TUser>> {
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
