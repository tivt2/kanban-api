import { TaskModel } from '../../../models/task.model';
import { create_task } from '../../DB/prisma-queries/task/create-task';
import { delete_task } from '../../DB/prisma-queries/task/delete-task';
import { find_many_user_tasks } from '../../DB/prisma-queries/task/find-many-user-tasks';
import { update_task } from '../../DB/prisma-queries/task/update-task';
import { ITaskRepository } from './task.repository.interface';

export class TaskRepository implements ITaskRepository {
  async create_task(
    project_id: string,
    user_id: string,
    title: string,
    content: string,
    status: 'INCOMPLETE' | 'WORKING' | 'COMPLETE',
  ): Promise<TaskModel | undefined> {
    const task = await create_task(project_id, user_id, title, content, status);

    if (!task) {
      return;
    }

    return task;
  }

  async delete_task(
    project_id: string,
    user_id: string,
    task_id: string,
  ): Promise<TaskModel | undefined> {
    const task = await delete_task(project_id, user_id, task_id);

    if (!task) {
      return;
    }

    return task;
  }

  async update_task(
    project_id: string,
    user_id: string,
    task_id: string,
    title?: string | undefined,
    content?: string | undefined,
    status?: 'INCOMPLETE' | 'WORKING' | 'COMPLETE' | undefined,
  ): Promise<TaskModel | undefined> {
    const task = await update_task(
      project_id,
      user_id,
      task_id,
      title,
      content,
      status,
    );

    if (!task) {
      return;
    }

    return task;
  }

  async get_tasks(user_id: string): Promise<TaskModel[] | undefined> {
    const tasks = await find_many_user_tasks(user_id);

    if (!tasks) {
      return;
    }

    return tasks;
  }
}
