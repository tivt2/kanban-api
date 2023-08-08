import { Either } from '../../../shared/either';

export interface IRequestValidator<T> {
  validate(schema: any, value: any): Promise<Either<Error, T>>;
}
