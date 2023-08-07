import { PasswordEncrypter } from './password-encrypter/password-encrypter.service';
import { TokenManager } from './token-manager/token-manager.service';
import { UserInputValidator } from './user-input-validator/user-input-validator.service';

export const get_password_encrypter = (function initializer() {
  let password_encrypter: PasswordEncrypter | undefined;
  return function () {
    if (!password_encrypter) {
      password_encrypter = new PasswordEncrypter();

      return password_encrypter;
    }

    return password_encrypter;
  };
})();

export const get_token_manager = (function initializer() {
  let token_manager: TokenManager | undefined;
  return function (secret: string, expires_in_ms: number) {
    if (!token_manager) {
      token_manager = new TokenManager(secret, expires_in_ms);

      return token_manager;
    }

    return token_manager;
  };
})();

export const get_user_input_validator = (function initializer() {
  let user_input_validator: UserInputValidator | undefined;
  return function () {
    if (!user_input_validator) {
      user_input_validator = new UserInputValidator();

      return user_input_validator;
    }

    return user_input_validator;
  };
})();
