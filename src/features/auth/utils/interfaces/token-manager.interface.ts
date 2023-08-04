export interface ITokenManager<T = { userId: string }> {
  generate(payload: T): Promise<string>;
}
