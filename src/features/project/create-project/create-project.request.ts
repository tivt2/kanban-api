import { z } from 'zod';
import { Either } from '../../../shared/either';
import { InvalidProjectRequestError } from '../errors/invalid-project-request-error';
import { IRequestValidator } from '../utils/request-validator/request-validator.service.interface';

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

type KnownRequest = z.infer<typeof create_project_request_schema>;

type UnkownRequest = {
  body: {
    [key: string]: any;
  };
};

export class CreateProjectRequest {
  constructor(private request_validator: IRequestValidator) {}

  async validate(
    req: UnkownRequest,
  ): Promise<Either<Error, KnownRequest['body']>> {
    const result = await this.request_validator.is_valid<KnownRequest>(
      create_project_request_schema,
      req,
    );

    if (result.isLeft()) {
      return Either.left(new InvalidProjectRequestError(result.valueL.message));
    }

    const { user_id, title, description } = result.valueR.body;
    return Either.right({ user_id, title, description });
  }
}
