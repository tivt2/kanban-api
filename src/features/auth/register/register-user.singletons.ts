import { UserInputValidator } from '../utils/user-input-validator.service';
import { RegisterUserRequest } from './register-user.request';

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
