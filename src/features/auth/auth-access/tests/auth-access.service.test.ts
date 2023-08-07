import { InvalidAccessTokenError } from '../../errors/Invalid-access-token-error';
import { AuthAccessServiceError } from '../../errors/auth-access.service.error';
import { TokenManagerSpy } from '../../utils/token-manager/token-manager.spy';
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

    accessManagerSpy.payload = { user_id: token };
    const user_id = await sut.authorize(token);

    expect(user_id.isRight()).toBe(true);
    expect(user_id.valueR).toBe(token);
  });

  test('Should return correct error if token is not valid', async () => {
    const { sut, accessManagerSpy } = makeSut();
    const token = 'valid_token';

    accessManagerSpy.shouldThrow = true;
    const user_id = await sut.authorize(token);

    expect(user_id.isLeft()).toBe(true);
    expect(user_id.valueL).toBeInstanceOf(InvalidAccessTokenError);
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
