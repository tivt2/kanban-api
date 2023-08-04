import { InvalidAccessTokenError } from '../../error-handler/errors/InvalidAccessTokenError';
import { AuthAccessServiceError } from '../../error-handler/errors/auth-access.service.error';
import { TokenManagerSpy } from '../../utils/mocks/token-manager.spy';
import { AuthAccessService } from '../auth-access.service';

function makeSut() {
  const accessManagerSpy = new TokenManagerSpy('access_secret');
  const sut = new AuthAccessService(accessManagerSpy);
  return {
    sut,
    accessManagerSpy,
  };
}

describe('AuthAccessService', () => {
  test('Should return a userId if token is valid', async () => {
    const { sut, accessManagerSpy } = makeSut();
    const token = 'valid_token';

    accessManagerSpy.payload = { userId: token };
    const userId = await sut.authorize(token);

    expect(userId.isRight()).toBe(true);
    expect(userId.valueR).toBe(token);
  });

  test('Should return correct error if token is not valid', async () => {
    const { sut, accessManagerSpy } = makeSut();
    const token = 'valid_token';

    accessManagerSpy.shouldThrow = true;
    const userId = await sut.authorize(token);

    expect(userId.isLeft()).toBe(true);
    expect(userId.valueL).toBeInstanceOf(InvalidAccessTokenError);
  });

  test('Should throw correct error if helpers throw', async () => {
    const { sut, accessManagerSpy } = makeSut();
    const token = 'valid_token';

    accessManagerSpy.shouldThrow = true;
    accessManagerSpy.jsonError = false;

    await expect(async () => await sut.authorize(token)).rejects.toThrow(
      AuthAccessServiceError,
    );
  });
});
