import { UserModel } from '../../../models/user.model';

export interface IUserRepository {
  insert(email: string, password: string): Promise<UserModel>;
  find_by_email(email: string): Promise<UserModel | undefined>;
}
