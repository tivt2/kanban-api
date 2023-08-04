export interface IPasswordEncrypter {
  encrypt(password: string): Promise<string>;
}
