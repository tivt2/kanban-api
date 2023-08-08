import { RequestValidator } from '../../shared/request-validator/request-validator.service';
import {
  RequestResultRefreshLogout,
  user_refresh_logout_schema,
} from '../schemas/user-refresh-logout-schema';

export class LogoutUserRequest extends RequestValidator<RequestResultRefreshLogout> {
  constructor() {
    super(user_refresh_logout_schema);
  }
}
