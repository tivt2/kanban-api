import { RefreshStorageMemorySpy } from '../../../../data/repositories/mocks/refresh-storage.memory.spy';
import { RefreshRepositorySpy } from '../../../../data/repositories/mocks/refresh.repository.spy';
import { InvalidRefreshTokenError } from '../../error-handler/errors/invalid-refresh-token-error';
import { RefreshServiceError } from '../../error-handler/errors/refresh.service.error';
import { TokenManagerSpy } from '../../utils/mocks/token-manager.spy';
import { RefreshService } from '../refresh.service';

function makeSut() {
  const refreshManagerSpy = new TokenManagerSpy('refresh_secret');
  const accessManagerSpy = new TokenManagerSpy('access_secret');
  const refreshRepositorySpy = new RefreshRepositorySpy();
  const refreshStorageMemorySpy = new RefreshStorageMemorySpy(1000);
  const sut = new RefreshService(
    refreshManagerSpy,
    accessManagerSpy,
    refreshRepositorySpy,
    refreshStorageMemorySpy,
  );
  return {
    sut,
    refreshManagerSpy,
    accessManagerSpy,
    refreshRepositorySpy,
    refreshStorageMemorySpy,
  };
}

describe('RefreshService', () => {
  test('Should throw correct error if helpers throw', async () => {
    const { sut, refreshManagerSpy, accessManagerSpy } = makeSut();
    const refresh_token = 'valid_refresh_token';

    refreshManagerSpy.shouldThrow = true;
    refreshManagerSpy.jsonError = false;
    await expect(async () => await sut.refresh(refresh_token)).rejects.toThrow(
      RefreshServiceError,
    );

    refreshManagerSpy.shouldThrow = false;
    accessManagerSpy.shouldThrow = true;
    accessManagerSpy.jsonError = false;
    await expect(async () => await sut.refresh(refresh_token)).rejects.toThrow(
      RefreshServiceError,
    );
  });

  test('Should return correct error if refresh_token is no valid', async () => {
    const { sut, refreshManagerSpy } = makeSut();
    const refresh_token = 'invalid_refresh_token';

    refreshManagerSpy.shouldThrow = true;
    refreshManagerSpy.jsonError = true;
    const refreshed_tokens = await sut.refresh(refresh_token);

    expect(refreshed_tokens.isLeft()).toBe(true);
    expect(refreshed_tokens.valueL).toBeInstanceOf(InvalidRefreshTokenError);
  });

  test('Should return {new_access_token, new_refresh_token} if refresh_token is valid', async () => {
    const { sut } = makeSut();
    const refresh_token = 'valid_refresh_token';

    const refreshed_tokens = await sut.refresh(refresh_token);

    expect(refreshed_tokens.isRight()).toBe(true);
    expect(refreshed_tokens.valueR).toMatchObject({
      new_access_token: expect.any(String),
      new_refresh_token: expect.any(String),
    });
  });
});
