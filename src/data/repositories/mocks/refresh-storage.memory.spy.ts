import { TRefreshToken } from '../../../models/refresh-token.model';
import { IRefreshStorageMemory } from '../interfaces/refresh-storage.memory.interface';

export class RefreshStorageMemorySpy implements IRefreshStorageMemory {
  constructor(private expires_in_ms: number) {}
  async set(
    user_id: string,
    refresh_token: string,
    created_at: Date,
  ): Promise<void> {}
  async get(user_id: string): Promise<TRefreshToken | undefined> {
    return;
  }
  async remove(user_id: string): Promise<TRefreshToken | undefined> {
    return;
  }
}
