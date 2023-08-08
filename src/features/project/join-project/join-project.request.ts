import { RequestValidator } from '../../shared/request-validator/request-validator.service';
import {
  RequestResultProjectLeaveJoinConnect,
  project_leave_join_connect_schema,
} from '../schemas/project-leave-join-connect-schema';

export class JoinProjectRequest extends RequestValidator<RequestResultProjectLeaveJoinConnect> {
  constructor() {
    super(project_leave_join_connect_schema);
  }
}
