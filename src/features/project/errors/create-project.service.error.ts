export class CreateProjectServiceError extends Error {
  constructor() {
    super('Error while trying to create project');
  }
}
