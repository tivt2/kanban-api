import { IProjectRepository } from '../../../data/repositories/project/project.repository.interface';

export class LeaveProjectService {
  constructor(private project_repository: IProjectRepository) {}

  async leave_project(project_id: string, user_id: string): Promise<void> {
    await this.project_repository.update_participants(project_id, user_id);
  }
}
