import { Request } from 'express';
import { IUserInputValidator } from '../utils/interfaces/user-input-validator.interface';

export class RegisterUserRequest {
  constructor(private userInputValidator: IUserInputValidator) {}

  async validate(req: Request): Promise<{ email: string; password: string }> {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Please provide a valid email and password');
    }

    const isValid = this.userInputValidator.isValid(email, password);
    if (!isValid) {
      throw new Error('Invalid Email or password');
    }
    return { email, password };
  }
}
