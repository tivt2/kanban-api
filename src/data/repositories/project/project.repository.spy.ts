import { ProjectModel } from '../../../models/project.model';
import { UserModel } from '../../../models/user.model';
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
  user: UserModel = {
    id: 'valid_id',
    email: 'valid_email',
    password: 'valid_password',
    created_at: new Date(),
    updated_at: new Date(),
  };

  title = '';
  description: string | undefined = '';
  project_id = '';
  user_id = '';

  invalid_project = false;

  should_throw = false;

  async create_project(
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

  async edit_project(
    project_id: string,
    user_id: string,
    title?: string | undefined,
    description?: string | undefined,
  ): Promise<ProjectModel | undefined> {
    if (this.should_throw) {
      throw new Error();
    }
    if (this.invalid_project) {
      return;
    }
    this.project_id = project_id;
    this.user_id = user_id;
    if (title) {
      this.project.title = title;
    }
    this.description = description;
    return this.project;
  }

  async add_participants(
    project_id: string,
    user_id: string,
  ): Promise<ProjectModel | undefined> {
    if (this.should_throw) {
      throw new Error();
    }
    if (this.invalid_project) {
      return;
    }
    this.project_id = project_id;
    this.user_id = user_id;
    this.user.id = user_id;
    this.project.participants.push(this.user);
    return this.project;
  }

  async remove_participants(
    project_id: string,
    user_id: string,
  ): Promise<ProjectModel | undefined> {
    if (this.should_throw) {
      throw new Error();
    }
    if (this.invalid_project) {
      return;
    }
    this.project_id = project_id;
    this.user_id = user_id;
    this.user.id = user_id;
    return this.project;
  }
}
