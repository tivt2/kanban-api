import { z } from 'zod';
import { Either } from '../../../shared/either';
import { InvalidProjectDataError } from '../errors/invalid-project-data-error';

const create_project_request_schema = z.object({
  body: z.object({
    user_id: z.string(),
    title: z.string().max(50, 'Maximum of 40 characters for title'),
    description: z
      .string()
      .max(200, 'Maximum of 200 characters for description')
      .optional(),
  }),
});

type Request = z.infer<typeof create_project_request_schema>;

export class CreateProjectRequest {
  async validate(req: Request): Promise<Either<Error, Request['body']>> {
    const req_parsed = create_project_request_schema.safeParse(req);
    if (!req_parsed.success) {
      return Either.left(new InvalidProjectDataError());
    }

    const { user_id, title, description } = req_parsed.data.body;
    return Either.right({ user_id, title, description });
  }
}
