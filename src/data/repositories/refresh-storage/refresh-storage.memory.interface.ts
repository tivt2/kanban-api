import { RefreshModel } from '../../../models/refresh.model';

export interface IRefreshStorageMemory {
  set(user_id: string, refresh_token: string, created_at: Date): Promise<void>;
  get(user_id: string): Promise<RefreshModel | undefined>;
  remove(user_id: string): Promise<RefreshModel | undefined>;
}
