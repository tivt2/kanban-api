import { Request } from 'express';
import { IUserInputValidator } from '../utils/interfaces/user-input-validator.interface';
import { InvalidCredentialsError } from '../error-handler/errors/invalid-credentials-error';
import { LoginUserRequestError } from '../error-handler/errors/login-user.request.error';
import { Either } from '../../../shared/Either';

export class LoginUserRequest {
  constructor(private userInputValidator: IUserInputValidator) {}

  async validate(
    req: Request,
  ): Promise<Either<Error, { email: string; password: string }>> {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return Either.left(new InvalidCredentialsError('Invalid credentials'));
      }

      const isValid = await this.userInputValidator.validate(email, password);
      if (!isValid) {
        return Either.left(new InvalidCredentialsError('Invalid credentials'));
      }

      return Either.right({ email, password });
    } catch (err) {
      throw new LoginUserRequestError();
    }
  }
}
