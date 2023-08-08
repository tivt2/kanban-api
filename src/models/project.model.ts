import { UserModel } from './user.model';

export type ProjectModel = {
  id: string;
  title: string;
  description?: string;
  participants: UserModel[];
  created_at: Date;
  updated_at: Date;
};
