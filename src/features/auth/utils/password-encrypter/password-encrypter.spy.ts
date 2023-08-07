import { IPasswordEncrypter } from './password-encrypter.interface';

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

  async compare(password: string, hashed_password: string): Promise<boolean> {
    if (this.shouldThrow) {
      throw new Error();
    }
    this.password = password;
    this.hashedPassword = hashed_password;
    return this.doMatch;
  }
}
