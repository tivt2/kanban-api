import { IProjectRepository } from '../../../data/repositories/project/project.repository.interface';
import { ProjectModel } from '../../../models/project.model';
import { Either } from '../../../shared/either';
import { InvalidProjectError } from '../errors/invalid-project-error';

export class ConnectProjectService {
  constructor(private project_repository: IProjectRepository) {}

  async connect_project(
    project_id: string,
    user_id: string,
  ): Promise<Either<Error, ProjectModel>> {
    const project = await this.project_repository.get_project(
      project_id,
      user_id,
    );

    if (!project) {
      return Either.left(new InvalidProjectError());
    }

    return Either.right(project);
  }
}
