import { InvalidRequestError } from '../../../shared/errors/invalid-request-error';
import { JoinProjectRequest } from '../join-project.request';

function makeSut() {
  const sut = new JoinProjectRequest();
  return { sut };
}

describe('JoinProjectRequest', () => {
  test('Should return request if is a valid request', async () => {
    const { sut } = makeSut();
    const data = {
      params: {
        project_id: 'valid_project_id',
      },
      body: {
        user_id: 'valid_user_id',
      },
    };

    const result = await sut.validate(data);

    expect(result.isRight()).toBe(true);
    expect(result.valueR).toMatchObject(data);
  });

  test('Should return correct error if is a invalid request', async () => {
    const { sut } = makeSut();
    const data_without_project = {
      params: {},
      body: {
        user_id: 'valid_user_id',
      },
    };

    const result = await sut.validate(data_without_project);

    expect(result.isLeft()).toBe(true);
    expect(result.valueL).toBeInstanceOf(InvalidRequestError);

    const data_without_user = {
      params: {
        project_id: 'valid_project_id',
      },
      body: {},
    };

    const result2 = await sut.validate(data_without_user);

    expect(result2.isLeft()).toBe(true);
    expect(result2.valueL).toBeInstanceOf(InvalidRequestError);
  });
});
