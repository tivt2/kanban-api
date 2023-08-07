export class LoginUserRequestError extends Error {
  constructor() {
    super('Error trying to validate login user input');
  }
}
