import { TProject } from '../../../models/project.model';

export interface IProjectRepository {
  insert(title: string, description?: string): Promise<TProject>;
}
