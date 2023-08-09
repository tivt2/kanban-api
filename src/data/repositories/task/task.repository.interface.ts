import { TaskModel, TaskStatusModel } from '../../../models/task.model';

export interface ITaskRepository {
  create_task(
    project_id: string,
    user_id: string,
    title: string,
    content: string,
    status: TaskStatusModel,
  ): Promise<TaskModel>;
  delete_task(
    project_id: string,
    user_id: string,
    task_id: string,
  ): Promise<TaskModel | undefined>;
  update_task(
    project_id: string,
    user_id: string,
    task_id: string,
    title?: string,
    content?: string,
    status?: TaskStatusModel,
  ): Promise<TaskModel | undefined>;
  get_tasks(user_id: string): Promise<TaskModel[] | undefined>;
}
