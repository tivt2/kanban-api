import { z } from 'zod';
import { RequestValidator } from '../../shared/request-validator/request-validator.service';
import { TaskStatus, TaskStatusModel } from '../../../models/task.model';

const create_task_request_schema = z.object({
  params: z.object({
    project_id: z
      .string({ required_error: 'Invalid project' })
      .min(1, 'Invalid project'),
  }),
  body: z.object({
    user_id: z.string(),
    title: z
      .string({ required_error: 'Invalid task data' })
      .max(50, 'Maximum of 50 characters for title'),
    content: z
      .string()
      .max(200, 'Maximum of 200 characters for content')
      .optional()
      .default(''),
    status: z
      .enum(Object.keys(TaskStatus) as [TaskStatusModel], {
        invalid_type_error: 'Invalid task data',
      })
      .optional()
      .default('INCOMPLETE'),
  }),
});

type RequestResultCreateTask = z.infer<typeof create_task_request_schema>;

export class CreateTaskRequest extends RequestValidator<RequestResultCreateTask> {
  constructor() {
    super(create_task_request_schema);
  }
}
