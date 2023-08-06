import { TRefreshToken } from '../../models/refresh-token.model';
import { REFRESH_EXPIRES_IN_MS } from '../../config/CONSTANTS';
import { MinDateHeap } from '../../shared/min-date-heap';
import { IRefreshStorageMemory } from './interfaces/refresh-storage.memory.interface';

export class RefreshStorageMemory implements IRefreshStorageMemory {
  private data = new Map<string, TRefreshToken>();
  private min_date_heap = new MinDateHeap();

  private timeout = setTimeout(() => {}, 1);

  async set(
    user_id: string,
    refresh_token: string,
    created_at: Date,
  ): Promise<void> {
    this.data.set(user_id, { user_id, refresh_token, created_at });
    this.min_date_heap.add(user_id, created_at);
  }

  async get(user_id: string): Promise<TRefreshToken | undefined> {
    return this.data.get(user_id);
  }

  async remove(user_id: string): Promise<TRefreshToken | undefined> {
    const out = this.data.get(user_id);
    this.data.delete(user_id);
    this.min_date_heap.remove(user_id);
    return out;
  }

  private async auto_remove(): Promise<void> {
    const next_id = this.min_date_heap.peek();
    if (!next_id) {
      return;
    }

    const node = this.data.get(next_id);
    if (!node) {
      return;
    }

    const remove_in_ms =
      new Date().getTime() -
      (node.created_at.getTime() + REFRESH_EXPIRES_IN_MS);

    if (remove_in_ms <= 0) {
      await this.remove(next_id);
      await this.auto_remove();
      return;
    }

    clearTimeout(this.timeout);

    this.timeout = setTimeout(async () => {
      await this.remove(next_id);
      await this.auto_remove();
    }, remove_in_ms);
  }
}