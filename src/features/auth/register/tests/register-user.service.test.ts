import { UserRepositorySpy } from '../../../../data/repositories/mocks/user.repository.spy';
import { RegisterUserServiceError } from '../../error-handler/errors/register-user.service.error';
import { PasswordEncrypterSpy } from '../../utils/mocks/password-encrypter.spy';
import { RegisterUserService } from '../register-user.service';

function makeSut() {
  const userRepoSpy = new UserRepositorySpy();
  const passEncryptSpy = new PasswordEncrypterSpy();
  const sut = new RegisterUserService(userRepoSpy, passEncryptSpy);
  return {
    sut,
    userRepoSpy,
    passEncryptSpy,
  };
}

describe('RegisterUserService', () => {
  test('Should pass correctly email and password to corresponding helpers', async () => {
    const { sut, userRepoSpy, passEncryptSpy } = makeSut();
    const data = {
      email: 'valid_email',
      password: 'valid_password',
    };

    const user = await sut.register(data.email, data.password);
    expect(data.email).toBe(userRepoSpy.user.email);
    expect(data.password).toBe(passEncryptSpy.password);
    expect(user.password).toBe(passEncryptSpy.hashedPassword);
  });

  test('Should throw correct error if helpers throw', async () => {
    const { sut, userRepoSpy, passEncryptSpy } = makeSut();
    const data = {
      email: 'valid_email',
      password: 'valid_password',
    };

    userRepoSpy.shouldThrow = true;
    await expect(
      async () => await sut.register(data.email, data.password),
    ).rejects.toThrow(RegisterUserServiceError);

    userRepoSpy.shouldThrow = false;
    passEncryptSpy.shouldThrow = true;
    await expect(
      async () => await sut.register(data.email, data.password),
    ).rejects.toThrow(RegisterUserServiceError);
  });
});
