import { IProjectRepository } from '../../../data/repositories/project/project.repository.interface';
import { TProject } from '../../../models/project.model';
import { CreateProjectServiceError } from '../errors/create-project.service.error';

export class CreateProjectService {
  constructor(private project_repository: IProjectRepository) {}

  async create_project(title: string, description?: string): Promise<TProject> {
    try {
      const new_project = await this.project_repository.insert(
        title,
        description,
      );

      return new_project;
    } catch {
      throw new CreateProjectServiceError();
    }
  }
}
