import { Request } from 'express';
import { AuthAccessRequest } from '../auth-access.request';
import { InvalidAccessTokenError } from '../../error-handler/errors/InvalidAccessTokenError';

function makeSut() {
  const sut = new AuthAccessRequest();
  return { sut };
}

describe('AuthAccessRequest', () => {
  test('Should return a token if request has a token inside the request body', async () => {
    const { sut } = makeSut();
    const data = {
      body: {
        token: 'Bearer valid_token',
      },
    };

    const token = await sut.validate(data as Request);

    expect(token.isRight()).toBe(true);
    expect(token.valueR).toBe(data.body.token);
  });

  test('Should return the correct error if request does not have a token inside the request body', async () => {
    const { sut } = makeSut();
    const data = {
      body: {},
    };

    const token = await sut.validate(data as Request);

    expect(token.isLeft()).toBe(true);
    expect(token.valueL).toBeInstanceOf(InvalidAccessTokenError);
  });

  test('Should return the correct error if token prefix is not Bearer', async () => {
    const { sut } = makeSut();
    const data = {
      body: {
        token: 'valid_token_without_bearer',
      },
    };

    const token = await sut.validate(data as Request);

    expect(token.isLeft()).toBe(true);
    expect(token.valueL).toBeInstanceOf(InvalidAccessTokenError);
  });

  test('Should return the correct error if token sufix doesnt have a token', async () => {
    const { sut } = makeSut();
    const data = {
      body: {
        token: 'Bearer',
      },
    };

    const token = await sut.validate(data as Request);

    expect(token.isLeft()).toBe(true);
    expect(token.valueL).toBeInstanceOf(InvalidAccessTokenError);
  });
});
