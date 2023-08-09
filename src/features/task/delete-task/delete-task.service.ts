import { ITaskRepository } from '../../../data/repositories/task/task.repository.interface';
import { TaskModel } from '../../../models/task.model';
import { Either } from '../../../shared/either';
import { DeleteTaskServiceError } from '../errors/delete-task.service.error';
import { InvalidTaskError } from '../errors/invalid-task-error';

export class DeleteTaskService {
  constructor(private task_repository: ITaskRepository) {}

  async delete_task(
    project_id: string,
    user_id: string,
    task_id: string,
  ): Promise<Either<Error, TaskModel>> {
    try {
      const task = await this.task_repository.delete_task(
        project_id,
        user_id,
        task_id,
      );

      if (!task) {
        return Either.left(new InvalidTaskError());
      }

      return Either.right(task);
    } catch {
      throw new DeleteTaskServiceError();
    }
  }
}
