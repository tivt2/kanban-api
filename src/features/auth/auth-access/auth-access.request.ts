import { Request } from 'express';
import { Either } from '../../../shared/either';
import { InvalidAccessTokenError } from '../errors/Invalid-access-token-error';

export class AuthAccessRequest {
  constructor() {}

  async validate(req: Request): Promise<Either<Error, string>> {
    const access_token = req.headers.authorization;

    if (!access_token) {
      return Either.left(new InvalidAccessTokenError());
    }

    const [bearer, token] = access_token.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return Either.left(new InvalidAccessTokenError());
    }

    return Either.right(token);
  }
}
