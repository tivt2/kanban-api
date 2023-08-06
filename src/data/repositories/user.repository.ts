import { TUser } from '../../models/user.model';
import { IUserRepository } from './interfaces/user.repository.interface';

export class UserRepository implements IUserRepository {
  async insert(email: string, password: string): Promise<TUser> {
    return {} as TUser;
  }

  async find_by_email(email: string): Promise<TUser | undefined> {
    return;
  }
}
