export interface IUserInputValidator {
  isValid(email: string, password: string): Promise<boolean>;
}
