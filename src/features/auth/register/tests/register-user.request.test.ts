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

    const { email, password } = await sut.validate(data as Request);

    expect(email).toBe(data.body.email);
    expect(password).toBe(data.body.password);
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

    await expect(
      async () => await sut.validate(data as Request),
    ).rejects.toThrow(InvalidCredentialsError);
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

    await expect(
      async () => await sut.validate(data as Request),
    ).rejects.toThrow(InvalidCredentialsError);
  });
});
