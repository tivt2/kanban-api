export interface ITokenManager<T = { userId: string }> {
  generate(payload: T): Promise<string>;
  verify(token: string): Promise<T>;
}
