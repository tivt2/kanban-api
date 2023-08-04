import { TUser } from '../../../models/user.model';
import { IUserRepository } from '../interfaces/user-repository.interface';

export class UserRepositorySpy implements IUserRepository {
  user: TUser = {
    id: 'valid_id',
    email: '',
    password: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  shouldThrow = false;

  async insert(email: string, password: string): Promise<TUser> {
    if (this.shouldThrow) {
      throw new Error();
    }
    this.user.email = email;
    this.user.password = password;
    return this.user;
  }

  async findByEmail(email: string): Promise<TUser | undefined> {
    if (this.shouldThrow) {
      throw new Error();
    }
    this.user.email = email;
    return this.user;
  }
}
