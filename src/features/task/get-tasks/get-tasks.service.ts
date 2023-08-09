import { ITaskRepository } from '../../../data/repositories/task/task.repository.interface';
import { TaskModel } from '../../../models/task.model';
import { Either } from '../../../shared/either';
import { GetTasksServiceError } from '../errors/get-tasks.service.error';
import { InvalidTaskError } from '../errors/invalid-task-error';

export class GetTasksService {
  constructor(private task_repository: ITaskRepository) {}

  async get_tasks(
    project_id: string,
    user_id: string,
  ): Promise<Either<Error, TaskModel[]>> {
    try {
      const tasks = await this.task_repository.get_tasks(project_id, user_id);

      if (!tasks) {
        return Either.left(new InvalidTaskError());
      }

      return Either.right(tasks);
    } catch {
      throw new GetTasksServiceError();
    }
  }
}
