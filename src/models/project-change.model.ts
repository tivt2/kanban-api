import { TaskModel } from './task.model';

export const ProjectChangeType = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

export type ProjectChangeTypeModel = keyof typeof ProjectChangeType;

export type ProjectChangeModel = {
  type: ProjectChangeTypeModel;
  change: string | TaskModel;
};
