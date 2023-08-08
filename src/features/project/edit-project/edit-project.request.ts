import { z } from 'zod';
import { RequestValidator } from '../../shared/request-validator/request-validator.service';

const edit_project_request_schema = z.object({
  params: z.object({
    project_id: z
      .string({ required_error: 'Invalid project' })
      .min(1, 'Invalid project'),
  }),
  body: z.object({
    user_id: z.string(),
    title: z.string().max(50, 'Maximum of 50 characters').optional(),
    description: z.string().max(200, 'Maximum of 200 characters').optional(),
  }),
});

type RequestResultEditProject = z.infer<typeof edit_project_request_schema>;

export class EditProjectRequest extends RequestValidator<RequestResultEditProject> {
  constructor() {
    super(edit_project_request_schema);
  }
}
