export interface IUserInputValidator {
  validate(email: string, password: string): Promise<boolean>;
}
