import { Request } from 'express';
import { IUserInputValidator } from '../utils/interfaces/user-input-validator.interface';
import { RegisterUserRequestError } from '../errors/register-user.request.error';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { Either } from '../../../shared/either';

export class RegisterUserRequest {
  constructor(private user_input_validator: IUserInputValidator) {}

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

      const is_valid = await this.user_input_validator.validate(
        email,
        password,
      );
      if (!is_valid) {
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
