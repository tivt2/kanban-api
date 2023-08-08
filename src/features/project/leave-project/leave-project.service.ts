import { IProjectRepository } from '../../../data/repositories/project/project.repository.interface';
import { ProjectModel } from '../../../models/project.model';
import { Either } from '../../../shared/either';
import { InvalidProjectError } from '../errors/invalid-project-error';
import { LeaveProjectServiceError } from '../errors/leave-project.service.error';

export class LeaveProjectService {
  constructor(private project_repository: IProjectRepository) {}

  async leave_project(
    project_id: string,
    user_id: string,
  ): Promise<Either<Error, ProjectModel>> {
    try {
      const project = await this.project_repository.remove_participants(
        project_id,
        user_id,
      );

      if (!project) {
        return Either.left(new InvalidProjectError());
      }

      return Either.right(project);
    } catch {
      throw new LeaveProjectServiceError();
    }
  }
}
