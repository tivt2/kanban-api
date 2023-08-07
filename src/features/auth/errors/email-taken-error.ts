export class EmailTakenError extends Error {
  constructor() {
    super('Email already in use, please try to sign in');
  }
}
