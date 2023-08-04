import { Request } from 'express';
import { RefreshRequest } from '../refresh.request';
import { InvalidRefreshTokenError } from '../../error-handler/errors/invalid-refresh-token-error';

function makeSut() {
  const sut = new RefreshRequest();
  return { sut };
}

describe('RefreshRequest', () => {
  test('Should return correct error if refresh_token is not valid', async () => {
    const { sut } = makeSut();
    const data = {
      cookies: {
        refresh_token: '',
      },
    };

    const refresh_token = await sut.validate(data as Request);

    expect(refresh_token.isLeft()).toBe(true);
    expect(refresh_token.valueL).toBeInstanceOf(InvalidRefreshTokenError);
  });

  test('Should return refresh_token if refresh_token is valid', async () => {
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
