import { Request } from 'express';
import { AuthAccessRequest } from '../auth-access.request';
import { InvalidAccessTokenError } from '../../error-handler/errors/Invalid-access-token-error';

function makeSut() {
  const sut = new AuthAccessRequest();
  return { sut };
}

describe('AuthAccessRequest', () => {
  test('Should return a token if request has a token inside the request body', async () => {
    const { sut } = makeSut();
    const data = {
      body: {
        access_token: 'Bearer valid_token',
      },
    };

    const access_token = await sut.validate(data as Request);

    expect(access_token.isRight()).toBe(true);
    expect(access_token.valueR).toBe(data.body.access_token.split(' ')[1]);
  });

  test('Should return the correct error if request does not have a token inside the request body', async () => {
    const { sut } = makeSut();
    const data = {
      body: {},
    };

    const access_token = await sut.validate(data as Request);

    expect(access_token.isLeft()).toBe(true);
    expect(access_token.valueL).toBeInstanceOf(InvalidAccessTokenError);
  });

  test('Should return the correct error if token prefix is not Bearer', async () => {
    const { sut } = makeSut();
    const data = {
      body: {
        access_token: 'valid_token_without_bearer',
      },
    };

    const access_token = await sut.validate(data as Request);

    expect(access_token.isLeft()).toBe(true);
    expect(access_token.valueL).toBeInstanceOf(InvalidAccessTokenError);
  });

  test('Should return the correct error if token sufix doesnt have a token', async () => {
    const { sut } = makeSut();
    const data = {
      body: {
        access_token: 'Bearer',
      },
    };

    const access_token = await sut.validate(data as Request);

    expect(access_token.isLeft()).toBe(true);
    expect(access_token.valueL).toBeInstanceOf(InvalidAccessTokenError);
  });
});