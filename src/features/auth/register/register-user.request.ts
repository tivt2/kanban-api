import { Request } from 'express';
import { IUserInputValidator } from '../utils/interfaces/user-input-validator.interface';
import { RegisterUserRequestError } from '../error-handler/errors/register-user.request.error';
import { InvalidCredentialsError } from '../error-handler/errors/invalid-credentials-error';

export class RegisterUserRequest {
  constructor(private userInputValidator: IUserInputValidator) {}

  async validate(req: Request): Promise<{ email: string; password: string }> {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        throw new InvalidCredentialsError(
          'Please provide a valid email and password',
        );
      }

      const isValid = await this.userInputValidator.validate(email, password);
      if (!isValid) {
        throw new InvalidCredentialsError(
          'Email or password does not match the requirements',
        );
      }

      return { email, password };
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        throw err;
      }
      throw new RegisterUserRequestError();
    }
  }
}
