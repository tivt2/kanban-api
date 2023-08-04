import { IPasswordEncrypter } from '../interfaces/password-encrypter.interface';

export class PasswordEncrypterSpy implements IPasswordEncrypter {
  password = '';
  hashedPassword = '';
  shouldThrow = false;
  doMatch = true;

  async encrypt(password: string): Promise<string> {
    if (this.shouldThrow) {
      throw new Error();
    }
    this.password = password;
    this.hashedPassword = `${password}_encrypted`;
    return this.hashedPassword;
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    this.password = password;
    this.hashedPassword = hashedPassword;
    return this.doMatch;
  }
}
