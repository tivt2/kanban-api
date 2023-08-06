import { RefreshStorageMemory } from './refresh-storage.memory';
import { UserRepository } from './user.repository';

export const get_user_repository = (function initializer() {
  let user_repository: UserRepository | undefined;
  return function () {
    if (!user_repository) {
      user_repository = new UserRepository();

      return user_repository;
    }

    return user_repository;
  };
})();

export const get_refresh_storage_memory = (function initializer() {
  let refresh_storage_memory: RefreshStorageMemory | undefined;
  return function (expires_in_ms: number) {
    if (!refresh_storage_memory) {
      refresh_storage_memory = new RefreshStorageMemory(expires_in_ms);

      return refresh_storage_memory;
    }

    return refresh_storage_memory;
  };
})();
