export interface ITokenManager<T = { user_id: string }> {
  generate(payload: T): Promise<string>;
  verify(token: string): Promise<T>;
}
