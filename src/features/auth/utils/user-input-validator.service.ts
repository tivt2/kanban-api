import { IUserInputValidator } from './interfaces/user-input-validator.interface';
import validator from 'validator';

export class UserInputValidator implements IUserInputValidator {
  constructor() {}

  async validate(email: string, password: string): Promise<boolean> {
    const isEmail = validator.isEmail(email);
    const isPassword = validator.isStrongPassword(password);
    return isEmail && isPassword;
  }
}
