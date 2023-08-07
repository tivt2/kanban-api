import {
  ACCESS_EXPIRES_IN_MS,
  REFRESH_EXPIRES_IN_MS,
} from '../../../config/CONSTANTS';
import {
  get_refresh_repository,
  get_refresh_storage_memory,
} from '../../../data/repositories/index.singletons';
import { get_token_manager } from '../utils/index.singletons';
import { RefreshController } from './refresh.controller';
import { RefreshRequest } from './refresh.request';
import { RefreshService } from './refresh.service';

const get_refresh_request = (function initializer() {
  let refresh_request: RefreshRequest | undefined;
  return function () {
    if (!refresh_request) {
      refresh_request = new RefreshRequest();

      return refresh_request;
    }

    return refresh_request;
  };
})();

const get_refresh_service = (function initializer() {
  let refresh_service: RefreshService | undefined;
  return function () {
    if (!refresh_service) {
      refresh_service = new RefreshService(
        get_token_manager(
          process.env.JWT_REFRESH_SECRET as string,
          REFRESH_EXPIRES_IN_MS,
        ),
        get_token_manager(
          process.env.JWT_ACCESS_SECRET as string,
          ACCESS_EXPIRES_IN_MS,
        ),
        get_refresh_repository(),
        get_refresh_storage_memory(REFRESH_EXPIRES_IN_MS),
      );

      return refresh_service;
    }

    return refresh_service;
  };
})();

export const get_refresh_controller = (function initializer() {
  let refresh_controller: RefreshController | undefined;
  return function () {
    if (!refresh_controller) {
      refresh_controller = new RefreshController(
        get_refresh_request(),
        get_refresh_service(),
      );

      return refresh_controller;
    }

    return refresh_controller;
  };
})();
