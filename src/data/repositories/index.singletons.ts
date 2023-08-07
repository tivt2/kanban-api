import { RefreshStorageMemory } from './refresh-storage/refresh-storage.memory';
import { RefreshRepository } from './refresh/refresh.repository';
import { UserRepository } from './user/user.repository';

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

export const get_refresh_repository = (function initializer() {
  let refresh_repository: RefreshRepository | undefined;
  return function () {
    if (!refresh_repository) {
      refresh_repository = new RefreshRepository();

      return refresh_repository;
    }

    return refresh_repository;
  };
})();
