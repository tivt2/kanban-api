export class LoginUserServiceError extends Error {
  constructor() {
    super('Error trying to login user');
  }
}
