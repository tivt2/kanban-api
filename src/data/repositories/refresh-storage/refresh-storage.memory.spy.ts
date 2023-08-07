import { TRefreshToken } from '../../../models/refresh-token.model';
import { IRefreshStorageMemory } from './refresh-storage.memory.interface';

export class RefreshStorageMemorySpy implements IRefreshStorageMemory {
  refresh_data: TRefreshToken = {
    user_id: '',
    refresh_token: '',
    created_at: new Date(),
  };
  user_id: string = '';
  should_get: boolean = true;

  constructor(private expires_in_ms: number) {}

  async set(
    user_id: string,
    refresh_token: string,
    created_at: Date,
  ): Promise<void> {
    this.refresh_data = { user_id, refresh_token, created_at };
  }

  async get(user_id: string): Promise<TRefreshToken | undefined> {
    this.user_id = user_id;
    if (this.should_get) {
      this.refresh_data = {
        user_id,
        refresh_token: 'valid_refresh_token',
        created_at: new Date(),
      };
      return this.refresh_data;
    }
    return;
  }

  async remove(user_id: string): Promise<TRefreshToken | undefined> {
    return;
  }
}
