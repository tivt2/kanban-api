import { TUser } from '../../../models/user.model';

export interface IUserRepository {
  insert(email: string, password: string): Promise<TUser>;
  findByEmail(email: string): Promise<TUser | undefined>;
}