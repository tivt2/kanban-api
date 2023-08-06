import {
  ACCESS_EXPIRES_IN_MS,
  REFRESH_EXPIRES_IN_MS,
} from '../../../config/CONSTANTS';
import {
  get_refresh_storage_memory,
  get_user_repository,
} from '../../../data/repositories/index.singletons';
import {
  get_password_encrypter,
  get_token_manager,
  get_user_input_validator,
} from '../utils/index.singletons';
import { LoginUserController } from './login-user.controller';
import { LoginUserRequest } from './login-user.request';
import { LoginUserService } from './login-user.service';

const get_login_user_request = (function initializer() {
  let register_user_request: LoginUserRequest | undefined;
  return function () {
    if (!register_user_request) {
      register_user_request = new LoginUserRequest(get_user_input_validator());

      return register_user_request;
    }

    return register_user_request;
  };
})();

const get_login_user_service = (function initializer() {
  let register_user_request: LoginUserService | undefined;
  return function () {
    if (!register_user_request) {
      register_user_request = new LoginUserService(
        get_user_repository(),
        get_password_encrypter(),
        get_token_manager(
          process.env.JWT_ACCESS_SECRET as string,
          ACCESS_EXPIRES_IN_MS,
        ),
        get_token_manager(
          process.env.JWT_REFRESH_SECRET as string,
          REFRESH_EXPIRES_IN_MS,
        ),
        get_refresh_storage_memory(REFRESH_EXPIRES_IN_MS),
      );

      return register_user_request;
    }

    return register_user_request;
  };
})();

export const get_login_user_controller = (function initializer() {
  let login_user_controller: LoginUserController | undefined;
  return function () {
    if (!login_user_controller) {
      login_user_controller = new LoginUserController(
        get_login_user_request(),
        get_login_user_service(),
      );

      return login_user_controller;
    }

    return login_user_controller;
  };
})();
