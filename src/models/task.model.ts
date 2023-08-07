export enum ETaskStatus {
  INCOMPLETE,
  WORKING,
  COMPLETE,
}

export type TTaskUpdate = {
  id: string;
  task_id: string;
  title: string;
  content: string;
  status: ETaskStatus;
  updated_by: string;
  updated_at: Date;
};

export type TTask = {
  id: string;
  title: string;
  content: string;
  status: ETaskStatus;
  created_by: string;
  created_at: Date;
  updates: TTaskUpdate[];
};
