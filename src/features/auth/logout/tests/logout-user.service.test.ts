import { RefreshStorageMemorySpy } from '../../../../data/repositories/mocks/refresh-storage.memory.spy';
import { RefreshRepositorySpy } from '../../../../data/repositories/mocks/refresh.repository.spy';
import { InvalidRefreshTokenError } from '../../errors/invalid-refresh-token-error';
import { LogoutUserServiceError } from '../../errors/logout-user.service.error';
import { TokenManagerSpy } from '../../utils/mocks/token-manager.spy';
import { LogoutUserService } from '../logout-user.service';

function makeSut() {
  const refreshManagerSpy = new TokenManagerSpy('refresh_secret');
  const refreshRepositorySpy = new RefreshRepositorySpy();
  const refreshStorageSpy = new RefreshStorageMemorySpy(1000);
  const sut = new LogoutUserService(
    refreshManagerSpy,
    refreshRepositorySpy,
    refreshStorageSpy,
  );
  return {
    sut,
    refreshManagerSpy,
    refreshRepositorySpy,
    refreshStorageSpy,
  };
}

describe('LogoutUserService', () => {
  test('Should throw correct error if helpers throw', async () => {
    const { sut, refreshManagerSpy } = makeSut();
    const refresh_token = 'valid_refresh_token';

    refreshManagerSpy.shouldThrow = true;
    refreshManagerSpy.jsonError = false;

    await expect(async () => await sut.logout(refresh_token)).rejects.toThrow(
      LogoutUserServiceError,
    );
  });

  test('Should return correct error if invalid refresh_token', async () => {
    const { sut, refreshManagerSpy } = makeSut();
    const refresh_token = 'invalid_refresh_token';

    refreshManagerSpy.shouldThrow = true;
    refreshManagerSpy.jsonError = true;
    const user_id = await sut.logout(refresh_token);

    expect(user_id.isLeft()).toBe(true);
    expect(user_id.valueL).toBeInstanceOf(InvalidRefreshTokenError);
  });
});
