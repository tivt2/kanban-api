export class DeleteTaskServiceError extends Error {
  constructor() {
    super('Error while trying to delete task');
  }
}
