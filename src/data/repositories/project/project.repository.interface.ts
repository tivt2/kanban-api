import { ProjectModel } from '../../../models/project.model';

export interface IProjectRepository {
  insert(title: string, description?: string): Promise<ProjectModel>;
  update_participants(project_id: string, user_id: string): Promise<void>;
}
