import { Either } from '../../../../shared/either';

export interface IRequestValidator {
  is_valid<T>(schema: any, value: any): Promise<Either<Error, T>>;
}
