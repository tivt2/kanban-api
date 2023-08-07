export interface IPasswordEncrypter {
  encrypt(password: string): Promise<string>;
  compare(password: string, hashed_password: string): Promise<boolean>;
}
