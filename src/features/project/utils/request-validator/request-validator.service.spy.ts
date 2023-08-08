import { Either } from '../../../../shared/either';
import { IRequestValidator } from './request-validator.service.interface';

export class RequestValidatorSpy implements IRequestValidator {
  schema: any;
  value: any;
  should_throw = false;
  validate = true;

  async is_valid(schema: any, value: any): Promise<Either<Error, any>> {
    this.schema = schema;
    this.value = value;
    if (this.should_throw) {
      throw new Error();
    }
    if (this.validate) {
      return Either.right(value);
    }
    return Either.left(new Error('bad request'));
  }
}
