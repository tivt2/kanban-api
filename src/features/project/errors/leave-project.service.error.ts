export class LeaveProjectServiceError extends Error {
  constructor() {
    super('Error while trying to leave project');
  }
}
