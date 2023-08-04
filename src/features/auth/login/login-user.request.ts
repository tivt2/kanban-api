import { Request } from 'express';
import { IUserInputValidator } from '../utils/interfaces/user-input-validator.interface';
import { InvalidCredentialsError } from '../error-handler/errors/invalid-credentials-error';
import { LoginUserRequestError } from '../error-handler/errors/login-user.request.error';

export class LoginUserRequest {
  constructor(private userInputValidator: IUserInputValidator) {}

  async validate(req: Request): Promise<{ email: string; password: string }> {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        throw new InvalidCredentialsError('Invalid credentials');
      }

      const isValid = await this.userInputValidator.validate(email, password);
      if (!isValid) {
        throw new InvalidCredentialsError('Invalid credentials');
      }

      return { email, password };
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        throw err;
      }
      throw new LoginUserRequestError();
    }
  }
}
