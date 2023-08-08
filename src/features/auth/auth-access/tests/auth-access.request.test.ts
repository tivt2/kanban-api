import { Request } from 'express';
import { AuthAccessRequest } from '../auth-access.request';
import { InvalidAccessTokenError } from '../../errors/Invalid-access-token-error';
import { InvalidRequestError } from '../../../shared/errors/invalid-request-error';

function makeSut() {
  const sut = new AuthAccessRequest();
  return { sut };
}

describe('AuthAccessRequest', () => {
  test('Should return request if its a valid request', async () => {
    const { sut } = makeSut();
    const data = {
      headers: {
        authorization: 'Bearer valid_token',
      },
    };

    const result = await sut.validate(data);

    expect(result.isRight()).toBe(true);
    expect(result.valueR.headers.authorization).toBe(
      data.headers.authorization.split(' ')[1],
    );
  });

  test('Should return the correct error if request does not have authorization inside the request body', async () => {
    const { sut } = makeSut();
    const data = {
      headers: {},
    };

    const result = await sut.validate(data);

    expect(result.isLeft()).toBe(true);
    expect(result.valueL).toBeInstanceOf(InvalidRequestError);
  });

  test('Should return the correct error if token prefix is not Bearer', async () => {
    const { sut } = makeSut();
    const data = {
      headers: {
        authorization: 'valid_token_without_bearer',
      },
    };

    const result = await sut.validate(data);

    expect(result.isLeft()).toBe(true);
    expect(result.valueL).toBeInstanceOf(InvalidRequestError);
  });

  test('Should return the correct error if token sufix doesnt have a token', async () => {
    const { sut } = makeSut();
    const data = {
      headers: {
        authorization: 'Bearer ',
      },
    };

    const result = await sut.validate(data);

    expect(result.isLeft()).toBe(true);
    expect(result.valueL).toBeInstanceOf(InvalidRequestError);
  });
});
