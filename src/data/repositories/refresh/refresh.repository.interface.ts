import { RefreshModel } from '../../../models/refresh.model';

export interface IRefreshRepository {
  insert(refresh_data: RefreshModel): Promise<RefreshModel>;
  find_refresh(refresh_token: string): Promise<RefreshModel | undefined>;
  delete_all_user_refreshes(user_id: string): Promise<void>;
  delete_expired_refreshes(): Promise<void>;
}
