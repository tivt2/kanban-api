import { get_user_repository } from '../../../data/repositories/index.singletons';
import {
  get_password_encrypter,
  get_user_input_validator,
} from '../utils/index.singletons';
import { RegisterUserController } from './register-user.controller';
import { RegisterUserRequest } from './register-user.request';
import { RegisterUserService } from './register-user.service';

const get_register_user_request = (function initializer() {
  let register_user_request: RegisterUserRequest | undefined;
  return function () {
    if (!register_user_request) {
      register_user_request = new RegisterUserRequest(
        get_user_input_validator(),
      );

      return register_user_request;
    }

    return register_user_request;
  };
})();

const get_register_user_service = (function initializer() {
  let register_user_service: RegisterUserService | undefined;
  return function () {
    if (!register_user_service) {
      register_user_service = new RegisterUserService(
        get_user_repository(),
        get_password_encrypter(),
      );

      return register_user_service;
    }

    return register_user_service;
  };
})();

export const get_register_user_controller = (function initializer() {
  let register_user_controller: RegisterUserController | undefined;
  return function () {
    if (!register_user_controller) {
      register_user_controller = new RegisterUserController(
        get_register_user_request(),
        get_register_user_service(),
      );

      return register_user_controller;
    }

    return register_user_controller;
  };
})();
