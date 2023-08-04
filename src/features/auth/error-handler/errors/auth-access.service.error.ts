export class AuthAccessServiceError extends Error {
  constructor() {
    super('Error trying to authenticate access token');
  }
}
