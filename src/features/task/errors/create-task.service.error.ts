export class CreateTaskServiceError extends Error {
  constructor() {
    super('Error while trying to create task');
  }
}
