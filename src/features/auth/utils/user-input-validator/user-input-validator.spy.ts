import { IUserInputValidator } from './user-input-validator.interface';

export class UserInputValidatorSpy implements IUserInputValidator {
  email = '';
  password = '';
  isValid = true;
  shouldThrow = false;
  async validate(email: string, password: string): Promise<boolean> {
    if (this.shouldThrow) {
      throw new Error();
    }
    this.email = email;
    this.password = password;
    return this.isValid;
  }
}
