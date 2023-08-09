import { TaskModel } from '../../../models/task.model';
import { ITaskRepository } from './task.repository.interface';

export class TaskRepository implements ITaskRepository {
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
}
