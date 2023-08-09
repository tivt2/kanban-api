import { ITaskRepository } from '../../../data/repositories/task/task.repository.interface';
import { TaskModel, TaskStatusModel } from '../../../models/task.model';
import { Either } from '../../../shared/either';
import { CreateTaskServiceError } from '../errors/create-task.service.error';

export class CreateTaskService {
  constructor(private task_repository: ITaskRepository) {}

  async create_taks(
    project_id: string,
    user_id: string,
    title: string,
    content: string,
    status: TaskStatusModel,
  ): Promise<TaskModel> {
    try {
      const task = await this.task_repository.create_task(
        project_id,
        user_id,
        title,
        content,
        status,
      );

      return task;
    } catch {
      throw new CreateTaskServiceError();
    }
  }
}
