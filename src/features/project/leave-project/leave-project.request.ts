import { z } from 'zod';
import { Either } from '../../../shared/either';
import { IRequestValidator } from '../utils/request-validator/request-validator.service.interface';
import { InvalidProjectRequestError } from '../errors/invalid-project-request-error';

const leave_project_request_schema = z.object({
  params: z.object({
    project_id: z.string({ required_error: 'Please provide a project id' }),
  }),
  body: z.object({
    user_id: z.string(),
  }),
});

type KnownRequest = z.infer<typeof leave_project_request_schema>;

type RequestResult = {
  project_id: KnownRequest['params']['project_id'];
  user_id: KnownRequest['body']['user_id'];
};

type UnkownRequest = {
  params: {
    [key: string]: any;
  };
  body: {
    [key: string]: any;
  };
};

export class LeaveProjectRequest {
  constructor(private request_validator: IRequestValidator) {}

  async validate(req: UnkownRequest): Promise<Either<Error, RequestResult>> {
    const result = await this.request_validator.is_valid<KnownRequest>(
      leave_project_request_schema,
      req,
    );

    if (result.isLeft()) {
      return Either.left(new InvalidProjectRequestError(result.valueL.message));
    }

    const {
      params: { project_id },
      body: { user_id },
    } = result.valueR;
    return Either.right({ project_id, user_id });
  }
}
