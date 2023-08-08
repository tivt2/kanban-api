import { UserModel } from '../../../models/user.model';
import { IUserRepository } from './user.repository.interface';

export class UserRepositorySpy implements IUserRepository {
  users: UserModel[] = [];
  email: string = '';
  password: string = '';
  undefined = false;
  shouldThrow = false;

  async insert(email: string, password: string): Promise<UserModel> {
    if (this.shouldThrow) {
      throw new Error();
    }
    this.users.push({
      id: 'valid_id',
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.email = email;
    this.password = password;
    return this.users.slice(-1)[0];
  }

  async find_by_email(email: string): Promise<UserModel | undefined> {
    if (this.shouldThrow) {
      throw new Error();
    }
    if (this.undefined) {
      return;
    }
    this.email = email;
    const find = this.users.find((user) => user.email === email);
    return find;
  }
}
