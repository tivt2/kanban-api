import { UserRepository } from '../../../data/repositories/user.repository';
import { PasswordEncrypter } from '../utils/password-encrypter.service';
import { UserInputValidator } from '../utils/user-input-validator.service';
import { RegisterUserController } from './register-user.controller';
import { RegisterUserRequest } from './register-user.request';
import { RegisterUserService } from './register-user.service';

export const get_register_user_request = (function initializer() {
  let register_user_request: RegisterUserRequest | undefined;
  return function () {
    if (!register_user_request) {
      const user_input_validator = new UserInputValidator();
      register_user_request = new RegisterUserRequest(user_input_validator);

      return register_user_request;
    }

    return register_user_request;
  };
})();

export const get_register_user_service = (function initializer() {
  let register_user_service: RegisterUserService | undefined;
  return function () {
    if (!register_user_service) {
      const user_repository = new UserRepository();
      const password_encrypter = new PasswordEncrypter();
      register_user_service = new RegisterUserService(
        user_repository,
        password_encrypter,
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
      const register_user_request = get_register_user_request();
      const register_user_service = get_register_user_service();
      register_user_controller = new RegisterUserController(
        register_user_request,
        register_user_service,
      );

      return register_user_controller;
    }

    return register_user_controller;
  };
})();
