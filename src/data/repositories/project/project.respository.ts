import { ProjectModel } from '../../../models/project.model';
import { IProjectRepository } from './project.repository.interface';

export class ProjectRepository implements IProjectRepository {
  async create_project(
    user_id: string,
    title: string,
    description?: string | undefined,
  ): Promise<ProjectModel> {
    return {} as ProjectModel;
  }

  async edit_project(
    project_id: string,
    user_id: string,
    title?: string | undefined,
    description?: string | undefined,
  ): Promise<ProjectModel | undefined> {
    return;
  }

  async add_participants(
    project_id: string,
    user_id: string,
  ): Promise<ProjectModel | undefined> {
    return;
  }

  async remove_participants(
    project_id: string,
    user_id: string,
  ): Promise<ProjectModel | undefined> {
    return;
  }
}
