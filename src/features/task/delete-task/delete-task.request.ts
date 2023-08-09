import { z } from 'zod';
import { RequestValidator } from '../../shared/request-validator/request-validator.service';

const delete_task_request_schema = z.object({
  params: z.object({
    project_id: z.string({ required_error: 'Invalid project' }),
    task_id: z.string({ required_error: 'Invalid task' }),
  }),
  body: z.object({
    user_id: z.string(),
  }),
});

type RequestResultDeleteTask = z.infer<typeof delete_task_request_schema>;

export class DeleteTaskRequest extends RequestValidator<RequestResultDeleteTask> {
  constructor() {
    super(delete_task_request_schema);
  }
}
