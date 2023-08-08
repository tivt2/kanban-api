import { LogoutUserRequest } from '../logout-user.request';
import { InvalidRequestError } from '../../../shared/errors/invalid-request-error';

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

    const result = await sut.validate(data);

    expect(result.isLeft()).toBe(true);
    expect(result.valueL).toBeInstanceOf(InvalidRequestError);
  });

  test('Should correctly return the refresh_token if refresh_token is present', async () => {
    const { sut } = makeSut();
    const data = {
      cookies: {
        refresh_token: 'valid_refresh_token',
      },
    };

    const result = await sut.validate(data);

    expect(result.isRight()).toBe(true);
    expect(result.valueR.cookies).toMatchObject(data.cookies);
  });
});
