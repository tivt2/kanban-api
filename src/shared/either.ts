export class Either<L, R> {
  private constructor(private readonly val: L | R) {}

  static left<L>(value: L): Either<L, never> {
    return new Either<L, never>(value);
  }

  static right<R>(value: R): Either<never, R> {
    return new Either<never, R>(value);
  }

  isLeft(): boolean {
    return this.val instanceof Error;
  }

  isRight(): boolean {
    return !this.isLeft();
  }

  get valueL(): L {
    if (this.isLeft()) {
      return this.val as L;
    }
    throw new Error('Either is not left');
  }

  get valueR(): R {
    if (this.isRight()) {
      return this.val as R;
    }
    throw new Error('Either is not left');
  }
}
