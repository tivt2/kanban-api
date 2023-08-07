import { TRefreshToken } from '../../../models/refresh-token.model';
import { IRefreshRepository } from './refresh.repository.interface';

export class RefreshRepositorySpy implements IRefreshRepository {
  refresh_data: TRefreshToken = {
    refresh_token: '',
    user_id: '',
    created_at: new Date(),
  };
  refresh_token: string = '';

  async insert(refresh_data: TRefreshToken): Promise<TRefreshToken> {
    this.refresh_data = refresh_data;
    return refresh_data;
  }

  async find_refresh(
    refresh_token: string,
  ): Promise<TRefreshToken | undefined> {
    this.refresh_token = refresh_token;
    return {
      refresh_token,
      user_id: 'valid_id',
      created_at: new Date(),
    };
  }

  async delete_all_user_refreshes(user_id: string): Promise<void> {
    return;
  }

  async delete_expired_refreshes(): Promise<void> {
    return;
  }
}
