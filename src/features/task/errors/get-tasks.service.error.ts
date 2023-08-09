export class GetTasksServiceError extends Error {
  constructor() {
    super('Error while trying to get tasks');
  }
}
