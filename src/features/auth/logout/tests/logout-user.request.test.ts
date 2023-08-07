import { Request } from 'express';
import { LogoutUserRequest } from '../logout-user.request';
import { InvalidRefreshTokenError } from '../../errors/invalid-refresh-token-error';

function makeSut() {
  const sut = new LogoutUserRequest();
  return { sut };
}

describe('LogoutUserRequest', () => {
  test('Should correctly return an error if refresh_token is not present', async () => {
    const { sut } = makeSut();
    const data = {
      cookies: {},
    };

    const refresh_token = await sut.validate(data as Request);

    expect(refresh_token.isLeft()).toBe(true);
    expect(refresh_token.valueL).toBeInstanceOf(InvalidRefreshTokenError);
  });

  test('Should correctly return the refresh_token if refresh_token is present', async () => {
    const { sut } = makeSut();
    const data = {
      cookies: {
        refresh_token: 'valid_refresh_token',
      },
    };

    const refresh_token = await sut.validate(data as Request);

    expect(refresh_token.isRight()).toBe(true);
    expect(refresh_token.valueR).toBe(data.cookies.refresh_token);
  });
});
