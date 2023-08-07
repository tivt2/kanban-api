import { TRefreshToken } from '../../../models/refresh-token.model';

export interface IRefreshRepository {
  insert(refresh_data: TRefreshToken): Promise<TRefreshToken>;
  find_refresh(refresh_token: string): Promise<TRefreshToken | undefined>;
}
