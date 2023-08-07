import { REFRESH_EXPIRES_IN_MS } from '../../../../config/CONSTANTS';
import { RefreshStorageMemorySpy } from '../../../../data/repositories/refresh-storage/refresh-storage.memory.spy';
import { UserRepositorySpy } from '../../../../data/repositories/user/user.repository.spy';
import { RefreshStorageMemory } from '../../../../data/repositories/refresh-storage/refresh-storage.memory';
import { InvalidCredentialsError } from '../../errors/invalid-credentials-error';
import { LoginUserServiceError } from '../../errors/login-user.service.error';
import { UserNotFoundError } from '../../errors/user-not-found-error';
import { PasswordEncrypterSpy } from '../../utils/password-encrypter/password-encrypter.spy';
import { TokenManagerSpy } from '../../utils/token-manager/token-manager.spy';
import { LoginUserService } from '../login-user.service';

function makeSut() {
  const userRepoSpy = new UserRepositorySpy();
  const passEncryptSpy = new PasswordEncrypterSpy();
  const accessManagerSpy = new TokenManagerSpy('access_secret');
  const refreshManagerSpy = new TokenManagerSpy('refresh_secret');
  const refreshStorageSpy = new RefreshStorageMemorySpy(1000);
  const sut = new LoginUserService(
    userRepoSpy,
    passEncryptSpy,
    accessManagerSpy,
    refreshManagerSpy,
    refreshStorageSpy,
  );
  return {
    sut,
    userRepoSpy,
    passEncryptSpy,
    accessManagerSpy,
    refreshManagerSpy,
    refreshStorageSpy,
  };
}

describe('LoginUserService', () => {
  test('Should pass correctly email and password to corresponding helpers', async () => {
    const { sut, userRepoSpy, passEncryptSpy } = makeSut();
    const data = {
      email: 'valid_email',
      password: 'valid_password',
    };

    userRepoSpy.users.push({
      id: 'valid_id',
      email: data.email,
      password: data.password,
      created_at: new Date(),
      updated_at: new Date(),
    });
    await sut.login(data.email, data.password);

    expect(data.email).toBe(userRepoSpy.email);
    expect(data.password).toBe(passEncryptSpy.password);
  });

  test('Should throw correct error if helpers throw', async () => {
    const {
      sut,
      userRepoSpy,
      passEncryptSpy,
      accessManagerSpy,
      refreshManagerSpy,
    } = makeSut();
    const data = {
      email: 'valid_email',
      password: 'valid_password',
    };

    userRepoSpy.users.push({
      id: 'valid_id',
      email: data.email,
      password: data.password,
      created_at: new Date(),
      updated_at: new Date(),
    });

    userRepoSpy.shouldThrow = true;
    await expect(async () =>
      sut.login(data.email, data.password),
    ).rejects.toThrow(LoginUserServiceError);

    userRepoSpy.shouldThrow = false;
    passEncryptSpy.shouldThrow = true;
    await expect(
      async () => await sut.login(data.email, data.password),
    ).rejects.toThrow(LoginUserServiceError);

    passEncryptSpy.shouldThrow = false;
    accessManagerSpy.shouldThrow = true;
    await expect(
      async () => await sut.login(data.email, data.password),
    ).rejects.toThrow(LoginUserServiceError);

    accessManagerSpy.shouldThrow = false;
    refreshManagerSpy.shouldThrow = true;
    await expect(
      async () => await sut.login(data.email, data.password),
    ).rejects.toThrow(LoginUserServiceError);
  });

  test('Should return correct error if user not found', async () => {
    const { sut, userRepoSpy } = makeSut();
    const data = {
      email: 'invalid_email',
      password: 'invalid_password',
    };

    userRepoSpy.undefined = true;
    const token = await sut.login(data.email, data.password);

    expect(token.isLeft()).toBe(true);
    expect(token.valueL).toBeInstanceOf(UserNotFoundError);
  });

  test('Should return correct error if password doesnt match', async () => {
    const { sut, userRepoSpy, passEncryptSpy } = makeSut();
    const data = {
      email: 'valid_email',
      password: 'invalid_password',
    };

    userRepoSpy.users.push({
      id: 'valid_id',
      email: data.email,
      password: data.password,
      created_at: new Date(),
      updated_at: new Date(),
    });

    passEncryptSpy.doMatch = false;
    const token = await sut.login(data.email, data.password);

    expect(token.isLeft()).toBe(true);
    expect(token.valueL).toBeInstanceOf(InvalidCredentialsError);
  });
});
