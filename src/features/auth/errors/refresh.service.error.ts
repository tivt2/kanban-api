export class RefreshServiceError extends Error {
  constructor() {
    super('Error trying to refresh token');
  }
}
