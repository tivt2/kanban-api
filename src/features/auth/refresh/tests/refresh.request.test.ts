import { RefreshRequest } from '../refresh.request';
import { InvalidRequestError } from '../../../shared/errors/invalid-request-error';

function makeSut() {
  const sut = new RefreshRequest();
  return { sut };
}

describe('RefreshRequest', () => {
  test('Should return correct error if request is not valid', async () => {
    const { sut } = makeSut();
    const data = {
      cookies: {
        refresh_token: '',
      },
    };

    const refresh_token = await sut.validate(data);

    expect(refresh_token.isLeft()).toBe(true);
    expect(refresh_token.valueL).toBeInstanceOf(InvalidRequestError);
  });

  test('Should return request if its a valid request', async () => {
    const { sut } = makeSut();
    const data = {
      cookies: {
        refresh_token: 'valid_refresh_token',
      },
    };

    const refresh_token = await sut.validate(data);

    expect(refresh_token.isRight()).toBe(true);
    expect(refresh_token.valueR.cookies).toMatchObject(data.cookies);
  });
});
