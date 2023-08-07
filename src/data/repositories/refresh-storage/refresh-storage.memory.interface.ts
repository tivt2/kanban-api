import { TRefreshToken } from '../../../models/refresh-token.model';

export interface IRefreshStorageMemory {
  set(user_id: string, refresh_token: string, created_at: Date): Promise<void>;
  get(user_id: string): Promise<TRefreshToken | undefined>;
  remove(user_id: string): Promise<TRefreshToken | undefined>;
}
