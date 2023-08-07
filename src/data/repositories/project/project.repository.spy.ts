import { TProject } from '../../../models/project.model';
import { IProjectRepository } from './project.repository.interface';

export class ProjectRepositorySpy implements IProjectRepository {
  project: TProject = {
    id: 'any_id',
    title: '',
    description: '',
    participants: [],
    created_at: new Date(),
    updated_at: new Date(),
  };
  title = '';
  description: string | undefined = '';

  should_throw = false;

  async insert(title: string, description?: string): Promise<TProject> {
    this.title = title;
    this.description = description;
    this.project.title = title;
    this.project.description = description;
    if (this.should_throw) {
      throw new Error();
    }
    return this.project;
  }
}
