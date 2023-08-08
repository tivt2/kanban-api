import { UserModel } from '../../../models/user.model';
import { create_user } from '../../DB/prisma-queries/user/create-user';
import { find_user_by_email } from '../../DB/prisma-queries/user/find-user-by-email';
import { IUserRepository } from './user.repository.interface';

export class UserRepository implements IUserRepository {
  async insert(email: string, password: string): Promise<UserModel> {
    const user = await create_user(email, password);

    return user;
  }

  async find_by_email(email: string): Promise<UserModel | undefined> {
    const user = await find_user_by_email(email);

    if (!user) {
      return;
    }

    return user;
  }
}
