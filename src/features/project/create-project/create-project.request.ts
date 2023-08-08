import { z } from 'zod';
import { RequestValidator } from '../../shared/request-validator/request-validator.service';

const create_project_request_schema = z.object({
  body: z.object({
    user_id: z.string(),
    title: z
      .string({ required_error: 'A title must be provided' })
      .max(50, 'Maximum of 40 characters for title'),
    description: z
      .string()
      .max(200, 'Maximum of 200 characters for description')
      .optional(),
  }),
});

type RequestResult = z.infer<typeof create_project_request_schema>;

export class CreateProjectRequest extends RequestValidator<RequestResult> {
  constructor() {
    super(create_project_request_schema);
  }
}
