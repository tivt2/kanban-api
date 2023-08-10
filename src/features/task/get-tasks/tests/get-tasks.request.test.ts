import { InvalidRequestError } from '../../../shared/errors/invalid-request-error';
import { GetTasksRequest } from '../get-tasks.request';

function makeSut() {
  const sut = new GetTasksRequest();
  return { sut };
}

describe('GetTasksRequest', () => {
  test('Should receive in the body or request all fields necessary', async () => {
    const { sut } = makeSut();
    const data = {
      body: {
        user_id: 'valid_id',
      },
    };

    const result = await sut.validate(data);

    expect(result.isRight()).toBe(true);
    expect(result.valueR.body).toMatchObject(data.body);
  });

  test('Should return correct error if body does not match necessary fields', async () => {
    const { sut } = makeSut();
    const data = {
      body: {},
    };

    const body = await sut.validate(data);

    expect(body.isLeft()).toBe(true);
    expect(body.valueL).toBeInstanceOf(InvalidRequestError);
  });
});
