import { TRefreshToken } from '../../models/refresh-token.model';
import { IRefreshRepository } from './interfaces/refresh.repository.interface';

export class RefreshRepository implements IRefreshRepository {
  async insert(refresh_data: TRefreshToken): Promise<TRefreshToken> {
    return {} as TRefreshToken;
  }

  async find_refresh(
    refresh_token: string,
  ): Promise<TRefreshToken | undefined> {
    return;
  }
}
