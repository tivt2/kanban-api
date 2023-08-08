import { RequestValidator } from '../../shared/request-validator/request-validator.service';
import {
  RequestResultRegisterLogin,
  user_register_login_schema,
} from '../schemas/user-register-login-schema';

export class RegisterUserRequest extends RequestValidator<RequestResultRegisterLogin> {
  constructor() {
    super(user_register_login_schema);
  }
}
