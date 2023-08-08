import { ProjectModel } from '../../../models/project.model';

export interface IProjectRepository {
  create_project(
    user_id: string,
    title: string,
    description?: string,
  ): Promise<ProjectModel>;
  remove_participants(
    project_id: string,
    user_id: string,
  ): Promise<ProjectModel>;
  add_participants(project_id: string, user_id: string): Promise<ProjectModel>;
}
