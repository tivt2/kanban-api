export const TaskStatus = {
  INCOMPLETE: 'INCOMPLETE',
  WORKING: 'WORKING',
  COMPLETE: 'COMPLETE',
} as const;

export type TaskStatusModel = keyof typeof TaskStatus;

export type TaskUpdateModel = {
  id: string;
  task_id: string;
  title: string;
  content: string;
  status: TaskStatusModel;
  updated_by: string;
  updated_at: Date;
};

export type TaskModel = {
  id: string;
  title: string;
  content: string;
  status: TaskStatusModel;
  created_by: string;
  created_at: Date;
  updates: TaskUpdateModel[];
};
