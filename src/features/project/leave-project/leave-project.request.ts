import { Either } from '../../../shared/either';
import { InvalidProjectIdError } from '../errors/invalid-project-id-error';

type TRequest = {
  body: {
    [key: string]: any;
  };
};

type TLeaveProjectBody = {
  project_id: string;
  user_id: string;
};

export class LeaveProjectRequest {
  async validate(req: TRequest): Promise<Either<Error, TLeaveProjectBody>> {
    const { project_id, user_id } = req.body;

    if (!project_id) {
      return Either.left(new InvalidProjectIdError());
    }

    return Either.right({ project_id, user_id });
  }
}
