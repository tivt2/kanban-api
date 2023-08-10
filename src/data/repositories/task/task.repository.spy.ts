import { TaskModel } from '../../../models/task.model';
import { ITaskRepository } from './task.repository.interface';

export class TaskRepositorySpy implements ITaskRepository {
  should_throw = false;

  task: TaskModel = {
    id: 'valid_id',
    title: '',
    content: '',
    status: 'INCOMPLETE',
    created_at: new Date(),
    created_by: 'valid_id',
    updates: [],
  };

  async create_task(
    project_id: string,
    user_id: string,
    title: string,
    content: string,
    status: 'INCOMPLETE' | 'WORKING' | 'COMPLETE',
  ): Promise<TaskModel> {
    if (this.should_throw) {
      throw new Error();
    }
    this.task.title = title;
    this.task.content = content;
    this.task.created_by = user_id;
    this.task.status = status;

    return this.task;
  }

  async delete_task(
    project_id: string,
    user_id: string,
    task_id: string,
  ): Promise<TaskModel | undefined> {
    if (this.should_throw) {
      throw new Error();
    }
    this.task.id = task_id;
    this.task.created_by = user_id;
    return this.task;
  }

  async update_task(
    project_id: string,
    user_id: string,
    task_id: string,
    title?: string | undefined,
    content?: string | undefined,
    status?: 'INCOMPLETE' | 'WORKING' | 'COMPLETE' | undefined,
  ): Promise<TaskModel | undefined> {
    if (this.should_throw) {
      throw new Error();
    }
    this.task.title = title ?? this.task.title;
    this.task.content = content ?? this.task.content;
    this.task.created_by = user_id;
    this.task.status = status ?? this.task.status;

    return this.task;
  }

  async get_tasks(user_id: string): Promise<TaskModel[] | undefined> {
    if (this.should_throw) {
      throw new Error();
    }
    this.task.created_by = user_id;
    return [this.task];
  }
}
