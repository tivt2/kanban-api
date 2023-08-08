import { z } from 'zod';
import { RequestValidator } from '../../shared/request-validator/request-validator.service';

const leave_project_request_schema = z.object({
  params: z.object({
    project_id: z.string({ required_error: 'Please provide a project id' }),
  }),
  body: z.object({
    user_id: z.string(),
  }),
});

type RequestResult = z.infer<typeof leave_project_request_schema>;

export class LeaveProjectRequest extends RequestValidator<RequestResult> {
  constructor() {
    super(leave_project_request_schema);
  }
}
