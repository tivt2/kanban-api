import { ITaskRepository } from '../../../data/repositories/task/task.repository.interface';
import { TaskModel, TaskStatusModel } from '../../../models/task.model';
import { Either } from '../../../shared/either';
import { EditTaskServiceError } from '../errors/edit-task.service.error';
import { InvalidTaskError } from '../errors/invalid-task-error';

export class EditTaskService {
  constructor(private task_repository: ITaskRepository) {}

  async edit_task(
    project_id: string,
    user_id: string,
    task_id: string,
    title?: string,
    content?: string,
    status?: TaskStatusModel,
  ): Promise<Either<Error, TaskModel>> {
    try {
      const task = await this.task_repository.update_task(
        project_id,
        user_id,
        task_id,
        title,
        content,
        status,
      );

      if (!task) {
        return Either.left(new InvalidTaskError());
      }

      return Either.right(task);
    } catch {
      throw new EditTaskServiceError();
    }
  }
}
