import { Request } from 'express';
import { IUserInputValidator } from '../utils/interfaces/user-input-validator.interface';
import { RegisterUserRequestError } from '../error-handler/errors/register-user.request.error';
import { InvalidCredentialsError } from '../error-handler/errors/invalid-credentials-error';
import { Either } from '../../../shared/either';

export class RegisterUserRequest {
  constructor(private userInputValidator: IUserInputValidator) {}

  async validate(
    req: Request,
  ): Promise<Either<Error, { email: string; password: string }>> {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return Either.left(
          new InvalidCredentialsError(
            'Please provide a valid email and password',
          ),
        );
      }

      const isValid = await this.userInputValidator.validate(email, password);
      if (!isValid) {
        return Either.left(
          new InvalidCredentialsError(
            'Email or password does not match the requirements',
          ),
        );
      }

      return Either.right({ email, password });
    } catch (err) {
      throw new RegisterUserRequestError();
    }
  }
}
