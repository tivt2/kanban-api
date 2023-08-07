export class InvalidCredentialsError extends Error {
  constructor(private description: string) {
    super(description);
  }
}
