import { IPasswordEncrypter } from './password-encrypter.interface';
import bcrypt from 'bcrypt';

export class PasswordEncrypter implements IPasswordEncrypter {
  async encrypt(password: string): Promise<string> {
    const hashed_password = await bcrypt.hash(password, 6);
    return hashed_password;
  }

  async compare(password: string, hashed_password: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(password, hashed_password);
    return isEqual;
  }
}
