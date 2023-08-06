import { TUser } from '../../models/user.model';
import { IUserRepository } from './interfaces/user.repository.interface';

export class UserRepository implements IUserRepository {
  async insert(email: string, password: string): Promise<TUser> {
    return {
      id: 'any_id',
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  async find_by_email(email: string): Promise<TUser | undefined> {
    return;
  }
}
