import { ACCESS_EXPIRES_IN_MS } from '../../../config/CONSTANTS';
import { get_token_manager } from '../utils/index.singletons';
import { AuthAccessController } from './auth-access.controller';
import { AuthAccessRequest } from './auth-access.request';
import { AuthAccessService } from './auth-access.service';

const get_auth_access_request = (function initializer() {
  let auth_access_request: AuthAccessRequest | undefined;
  return function () {
    if (!auth_access_request) {
      auth_access_request = new AuthAccessRequest();

      return auth_access_request;
    }

    return auth_access_request;
  };
})();

const get_auth_access_service = (function initializer() {
  let auth_access_service: AuthAccessService | undefined;
  return function () {
    if (!auth_access_service) {
      auth_access_service = new AuthAccessService(
        get_token_manager(
          process.env.JWT_ACCESS_SECRET as string,
          ACCESS_EXPIRES_IN_MS,
        ),
      );

      return auth_access_service;
    }

    return auth_access_service;
  };
})();

export const get_auth_access_controller = (function initializer() {
  let auth_access_controller: AuthAccessController | undefined;
  return function () {
    if (!auth_access_controller) {
      auth_access_controller = new AuthAccessController(
        get_auth_access_request(),
        get_auth_access_service(),
      );

      return auth_access_controller;
    }

    return auth_access_controller;
  };
})();
