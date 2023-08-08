import { ZodSchema, z } from 'zod';
import { Either } from '../../../../shared/either';
import { IRequestValidator } from './request-validator.service.interface';

export class RequestValidator implements IRequestValidator {
  async is_valid(
    schema: ZodSchema,
    value: any,
  ): Promise<Either<Error, z.infer<typeof schema>>> {
    const result = schema.safeParse(value);

    if (!result.success) {
      const message = result.error.errors.reduce(
        (acc, error, i) => acc + (i === 0 ? '' : ', ') + error.message,
        '',
      );

      return Either.left(new Error(message));
    }

    return Either.right(result.data);
  }
}
