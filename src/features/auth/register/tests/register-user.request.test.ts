import { RegisterUserRequest } from '../register-user.request';
import { InvalidRequestError } from '../../../shared/errors/invalid-request-error';

function makeSut() {
  const sut = new RegisterUserRequest();
  return {
    sut,
  };
}

describe('RegisterUserRequest', () => {
  test('Should return request if its a valid request', async () => {
    const { sut } = makeSut();
    const data = {
      body: {
        email: 'valid_email@email.com',
        password: 'Valid_password123',
      },
    };

    const body = await sut.validate(data);

    expect(body.isRight()).toBe(true);
    expect(body.valueR.body).toMatchObject(data.body);
  });

  test('Should return correct error its a not valid request', async () => {
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
});
