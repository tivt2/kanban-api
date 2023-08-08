import { ZodSchema } from 'zod';
import { Either } from '../../../shared/either';
import { IRequestValidator } from './request-validator.service.interface';
import { InvalidRequestError } from '../errors/invalid-request-error';

export class RequestValidator<Result> implements IRequestValidator<Result> {
  constructor(protected schema: ZodSchema) {}
  async validate(value: any): Promise<Either<Error, Result>> {
    const result = await this.schema.safeParseAsync(value);

    if (!result.success) {
      const message = result.error.errors.reduce(
        (acc, error, i) => acc + (i === 0 ? '' : ', ') + error.message,
        '',
      );

      return Either.left(new InvalidRequestError(message));
    }

    return Either.right(result.data);
  }
}
