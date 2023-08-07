import { Request } from 'express';
import { UserInputValidatorSpy } from '../../utils/user-input-validator/user-input-validator.spy';
import { InvalidCredentialsError } from '../../errors/invalid-credentials-error';
import { LoginUserRequest } from '../login-user.request';
import { LoginUserRequestError } from '../../errors/login-user.request.error';

function makeSut() {
  const inputValidatorSpy = new UserInputValidatorSpy();
  const sut = new LoginUserRequest(inputValidatorSpy);
  return {
    sut,
    inputValidatorSpy,
  };
}

describe('LoginUserRequest', () => {
  test('Should correctly pass email and password to helper', async () => {
    const { sut } = makeSut();
    const data = {
      body: {
        email: 'valid_email',
        password: 'valid_password',
      },
    };

    const body = await sut.validate(data as Request);
    expect(body.isRight()).toBe(true);

    expect(body.valueR).toMatchObject(data.body);
  });

  test('Should throw correct error if helper throw', async () => {
    const { sut, inputValidatorSpy } = makeSut();
    const data = {
      body: {
        email: 'valid_email',
        password: 'valid_password',
      },
    };

    inputValidatorSpy.shouldThrow = true;
    await expect(
      async () => await sut.validate(data as Request),
    ).rejects.toThrow(LoginUserRequestError);
  });

  test('Should throw correct error if email of password was not provided', async () => {
    const { sut } = makeSut();
    const data = {
      body: {
        email: '',
        password: '',
      },
    };

    const body = await sut.validate(data as Request);

    expect(body.isLeft()).toBe(true);
    expect(body.valueL).toBeInstanceOf(InvalidCredentialsError);
  });

  test('Should throw correct error if email or password is not valid', async () => {
    const { sut, inputValidatorSpy } = makeSut();
    const data = {
      body: {
        email: 'invalid_email',
        password: 'invalid_password',
      },
    };

    inputValidatorSpy.isValid = false;
    const body = await sut.validate(data as Request);

    expect(body.isLeft()).toBe(true);
    expect(body.valueL).toBeInstanceOf(InvalidCredentialsError);
  });
});
