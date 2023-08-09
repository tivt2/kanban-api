export class EditTaskServiceError extends Error {
  constructor() {
    super('Error while trying to edit task');
  }
}
