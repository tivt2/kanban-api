import { z } from 'zod';
import { RequestValidator } from '../../shared/request-validator/request-validator.service';

const get_tasks_request_schema = z.object({
  body: z.object({
    user_id: z.string(),
  }),
});

type RequestResultGetTasks = z.infer<typeof get_tasks_request_schema>;

export class GetTasksRequest extends RequestValidator<RequestResultGetTasks> {
  constructor() {
    super(get_tasks_request_schema);
  }
}
