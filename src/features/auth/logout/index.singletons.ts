import { REFRESH_EXPIRES_IN_MS } from '../../../config/CONSTANTS';
import {
  get_refresh_repository,
  get_refresh_storage_memory,
} from '../../../data/repositories/index.singletons';
import { get_token_manager } from '../utils/index.singletons';
import { LogoutUserController } from './logout-user.controller';
import { LogoutUserRequest } from './logout-user.request';
import { LogoutUserService } from './logout-user.service';

const get_logout_user_request = (function initializer() {
  let logout_user_request: LogoutUserRequest | undefined;
  return function () {
    if (!logout_user_request) {
      logout_user_request = new LogoutUserRequest();

      return logout_user_request;
    }

    return logout_user_request;
  };
})();

const get_logout_user_service = (function initializer() {
  let logout_user_service: LogoutUserService | undefined;
  return function () {
    if (!logout_user_service) {
      logout_user_service = new LogoutUserService(
        get_token_manager(
          process.env.JWT_REFRESH_SECRET as string,
          REFRESH_EXPIRES_IN_MS,
        ),
        get_refresh_repository(),
        get_refresh_storage_memory(REFRESH_EXPIRES_IN_MS),
      );

      return logout_user_service;
    }

    return logout_user_service;
  };
})();

export const get_logout_user_controller = (function initializer() {
  let logout_user_controller: LogoutUserController | undefined;
  return function () {
    if (!logout_user_controller) {
      logout_user_controller = new LogoutUserController(
        get_logout_user_request(),
        get_logout_user_service(),
      );

      return logout_user_controller;
    }

    return logout_user_controller;
  };
})();
