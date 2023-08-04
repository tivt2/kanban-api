import { Request } from 'express';
import { UserInputValidatorSpy } from '../../utils/mocks/user-input-validator.spy';
import { RegisterUserRequest } from '../register-user.request';
import { RegisterUserRequestError } from '../../error-handler/errors/register-user.request.error';
import { InvalidCredentialsError } from '../../error-handler/errors/invalid-credentials-error';

function makeSut() {
  const inputValidatorSpy = new UserInputValidatorSpy();
  const sut = new RegisterUserRequest(inputValidatorSpy);
  return {
    sut,
    inputValidatorSpy,
  };
}

describe('RegisterUserRequest', () => {
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
    ).rejects.toThrow(RegisterUserRequestError);
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
