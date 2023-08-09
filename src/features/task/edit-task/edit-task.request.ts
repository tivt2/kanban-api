import { z } from 'zod';
import { RequestValidator } from '../../shared/request-validator/request-validator.service';
import { TaskStatus, TaskStatusModel } from '../../../models/task.model';

const edit_task_request_schema = z.object({
  params: z.object({
    project_id: z.string({ required_error: 'Invalid project' }),
    task_id: z.string({ required_error: 'Invalid task' }),
  }),
  body: z.object({
    user_id: z.string(),
    title: z.string().optional(),
    content: z.string().optional(),
    status: z.enum(Object.keys(TaskStatus) as [TaskStatusModel]).optional(),
  }),
});

type RequestResultEditTask = z.infer<typeof edit_task_request_schema>;

export class EditTaskRequest extends RequestValidator<RequestResultEditTask> {
  constructor() {
    super(edit_task_request_schema);
  }
}
