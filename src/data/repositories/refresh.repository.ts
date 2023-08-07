import { TRefreshToken } from '../../models/refresh-token.model';
import { create_refresh } from '../DB/prisma-queries/refresh/create-refresh';
import { delete_refresh_by_created_at } from '../DB/prisma-queries/refresh/delete-refresh-by-created-at';
import { delete_user_refreshes_by_user_id } from '../DB/prisma-queries/refresh/delete-user-refreshses-by-user-id';
import { find_refresh_by_refresh_token } from '../DB/prisma-queries/refresh/find-refresh-by-refresh-token';
import { IRefreshRepository } from './interfaces/refresh.repository.interface';

export class RefreshRepository implements IRefreshRepository {
  async insert(refresh_data: TRefreshToken): Promise<TRefreshToken> {
    const created_refresh_data = await create_refresh(refresh_data);

    return created_refresh_data;
  }

  async find_refresh(
    refresh_token: string,
  ): Promise<TRefreshToken | undefined> {
    const refresh_data_from_repo = await find_refresh_by_refresh_token(
      refresh_token,
    );

    if (!refresh_data_from_repo) {
      return;
    }

    return refresh_data_from_repo;
  }

  async delete_all_user_refreshes(user_id: string): Promise<void> {
    await delete_user_refreshes_by_user_id(user_id);
  }

  async delete_expired_refreshes(): Promise<void> {
    await delete_refresh_by_created_at();
  }
}
