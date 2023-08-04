export class RegisterUserRequestError extends Error {
  constructor() {
    super('Error trying to validate user input');
  }
}
