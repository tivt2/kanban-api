import { IProjectRepository } from '../../../data/repositories/project/project.repository.interface';
import { ProjectModel } from '../../../models/project.model';
import { CreateProjectServiceError } from '../errors/create-project.service.error';

export class CreateProjectService {
  constructor(private project_repository: IProjectRepository) {}

  async create_project(
    user_id: string,
    title: string,
    description?: string,
  ): Promise<ProjectModel> {
    try {
      const project = await this.project_repository.create_project(
        user_id,
        title,
        description,
      );

      return project;
    } catch {
      throw new CreateProjectServiceError();
    }
  }
}
