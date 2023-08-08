import { Request } from 'express';
import { LoginUserRequest } from '../login-user.request';
import { InvalidRequestError } from '../../../shared/errors/invalid-request-error';

function makeSut() {
  const sut = new LoginUserRequest();
  return {
    sut,
  };
}

describe('LoginUserRequest', () => {
  test('Should correctly call with email and password', async () => {
    const { sut } = makeSut();
    const data = {
      body: {
        email: 'valid_email@email.com',
        password: 'Valid_password123',
      },
    };

    const result = await sut.validate(data as Request);

    expect(result.isRight()).toBe(true);
    expect(result.valueR.body).toMatchObject(data.body);
  });

  test('Should return correct error if email of password was not provided', async () => {
    const { sut } = makeSut();
    const data = {
      body: {
        email: '',
        password: '',
      },
    };

    const body = await sut.validate(data);

    expect(body.isLeft()).toBe(true);
    expect(body.valueL).toBeInstanceOf(InvalidRequestError);
  });

  test('Should return correct error if email or password is not valid', async () => {
    const { sut } = makeSut();
    const data = {
      body: {
        email: 'invalid_email',
        password: 'invalid_password',
      },
    };

    const body = await sut.validate(data);

    expect(body.isLeft()).toBe(true);
    expect(body.valueL).toBeInstanceOf(InvalidRequestError);
  });
});
