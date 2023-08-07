import { TUser } from './user.model';

export type TProject = {
  id: string;
  title: string;
  description?: string;
  participants: TUser[];
  created_at: Date;
  updated_at: Date;
};
