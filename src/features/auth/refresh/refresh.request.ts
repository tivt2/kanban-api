import { Request } from 'express';
import { Either } from '../../../shared/either';
import { InvalidRefreshTokenError } from '../error-handler/errors/invalid-refresh-token-error';

export class RefreshRequest {
  async validate(req: Request): Promise<Either<Error, string>> {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
      return Either.left(new InvalidRefreshTokenError());
    }

    return Either.right(refresh_token);
  }
}
