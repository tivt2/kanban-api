import { TUser } from './user.model';

export type TProject = {
  id: string;
  title: string;
  participants: TUser[];
  created_at: Date;
};
