import { Either } from '../../../shared/either';
import { InvalidProjectDataError } from '../errors/invalid-project-data-error';

type TRequest = {
  body: {
    [key: string]: any;
  };
};

type TCreateProjectBody = {
  title: string;
  description?: string;
};
// !!!! REMEMBER TO ADD ZOD AS A REQUEST VALIDATOR
export class CreateProjectRequest {
  async validate(req: TRequest): Promise<Either<Error, TCreateProjectBody>> {
    const { title, description } = req.body;

    if (!title) {
      return Either.left(new InvalidProjectDataError());
    }

    return Either.right({ title, description });
  }
}
