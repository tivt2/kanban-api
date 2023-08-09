import { ProjectModel } from '../../../models/project.model';

export interface IProjectRepository {
  get_project(
    project_id: string,
    user_id: string,
  ): Promise<ProjectModel | undefined>;
  create_project(
    user_id: string,
    title: string,
    description?: string,
  ): Promise<ProjectModel>;
  edit_project(
    project_id: string,
    user_id: string,
    title?: string,
    description?: string,
  ): Promise<ProjectModel | undefined>;
  remove_participant(
    project_id: string,
    user_id: string,
  ): Promise<ProjectModel | undefined>;
  add_participant(
    project_id: string,
    user_id: string,
  ): Promise<ProjectModel | undefined>;
}
