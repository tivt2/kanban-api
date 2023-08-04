import { Request } from 'express';
import { Either } from '../../../shared/Either';
import { InvalidAccessTokenError } from '../error-handler/errors/InvalidAccessTokenError';

export class AuthAccessRequest {
  constructor() {}

  async validate(req: Request): Promise<Either<Error, string>> {
    const { token } = req.body;

    if (!token) {
      return Either.left(new InvalidAccessTokenError());
    }

    const [bearer, accessToken] = token.split(' ');

    if (bearer !== 'Bearer' || !accessToken) {
      return Either.left(new InvalidAccessTokenError());
    }

    return Either.right(token);
  }
}
