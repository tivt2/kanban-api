export class LogoutUserServiceError extends Error {
  constructor() {
    super('Error while trying to logout user');
  }
}
