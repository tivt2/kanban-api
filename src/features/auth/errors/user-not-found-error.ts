export class UserNotFoundError extends Error {
  constructor(private description: string) {
    super(description);
  }
}
