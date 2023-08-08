import { ProjectModel } from '../../../models/project.model';
import { IProjectRepository } from './project.repository.interface';

export class ProjectRepositorySpy implements IProjectRepository {
  project: ProjectModel = {
    id: 'any_id',
    title: '',
    description: '',
    created_by: '',
    participants: [],
    created_at: new Date(),
    updated_at: new Date(),
  };
  title = '';
  description: string | undefined = '';
  project_id = '';
  user_id = '';

  should_throw = false;

  async insert(
    user_id: string,
    title: string,
    description?: string,
  ): Promise<ProjectModel> {
    this.user_id = user_id;
    this.title = title;
    this.description = description;

    this.project.created_by = user_id;
    this.project.title = title;
    this.project.description = description;
    if (this.should_throw) {
      throw new Error();
    }
    return this.project;
  }

  async update_participants(
    project_id: string,
    user_id: string,
  ): Promise<void> {
    this.project_id = project_id;
    this.user_id = user_id;
    return;
  }
}