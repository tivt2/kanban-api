import { ProjectModel } from '../../../models/project.model';
import { insert_participant } from '../../DB/prisma-queries/project/insert-participant';
import { create_project } from '../../DB/prisma-queries/project/create-project';
import { update_project } from '../../DB/prisma-queries/project/update-project';
import { IProjectRepository } from './project.repository.interface';
import { delete_participant_or_project } from '../../DB/prisma-queries/project/deleted-participant-or-project';
import { find_project_by_id_and_user_id } from '../../DB/prisma-queries/project/find-project-by-id-and-user-id';

export class ProjectRepository implements IProjectRepository {
  async get_project(
    project_id: string,
    user_id: string,
  ): Promise<ProjectModel | undefined> {
    const project = await find_project_by_id_and_user_id(project_id, user_id);

    if (!project) {
      return;
    }

    return project;
  }

  async create_project(
    user_id: string,
    title: string,
    description: string,
  ): Promise<ProjectModel> {
    const project = await create_project(user_id, title, description);

    return project;
  }

  async edit_project(
    project_id: string,
    user_id: string,
    title?: string | undefined,
    description?: string | undefined,
  ): Promise<ProjectModel | undefined> {
    const project = await update_project(
      project_id,
      user_id,
      title,
      description,
    );

    if (!project) {
      return;
    }

    return project;
  }

  async add_participant(
    project_id: string,
    user_id: string,
  ): Promise<ProjectModel | undefined> {
    const project = await insert_participant(project_id, user_id);

    if (!project) {
      return;
    }

    return project;
  }

  async remove_participant(
    project_id: string,
    user_id: string,
  ): Promise<ProjectModel | undefined> {
    const project = await delete_participant_or_project(project_id, user_id);

    if (!project) {
      return;
    }

    return project;
  }
}
