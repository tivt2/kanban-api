import { TaskModel } from '../../../models/task.model';
import { ITaskRepository } from './task.repository.interface';

export class TaskRepositorySpy implements ITaskRepository {
  async create_task(
    project_id: string,
    user_id: string,
    title: string,
    content: string,
    status: 'INCOMPLETE' | 'WORKING' | 'COMPLETE',
  ): Promise<TaskModel> {
    return {} as TaskModel;
  }

  async delete_task(
    project_id: string,
    user_id: string,
    task_id: string,
  ): Promise<TaskModel | undefined> {
    return;
  }

  async update_task(
    project_id: string,
    user_id: string,
    task_id: string,
    title?: string | undefined,
    content?: string | undefined,
    status?: 'INCOMPLETE' | 'WORKING' | 'COMPLETE' | undefined,
  ): Promise<TaskModel | undefined> {
    return;
  }

  async get_tasks(
    project_id: string,
    user_id: string,
  ): Promise<TaskModel[] | undefined> {
    return [];
  }
}
