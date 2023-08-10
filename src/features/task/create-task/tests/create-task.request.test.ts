import { InvalidRequestError } from '../../../shared/errors/invalid-request-error';
import { CreateTaskRequest } from '../create-task.request';

function makeSut() {
  const sut = new CreateTaskRequest();
  return { sut };
}

describe('CreateProjectRequest', () => {
  test('Should receive in the body or request all fields necessary', async () => {
    const { sut } = makeSut();
    const data = {
      params: {
        project_id: 'valid_id',
      },
      body: {
        user_id: 'valid_id',
        title: 'any_title',
        content: 'any_content',
        status: 'INCOMPLETE',
      },
    };

    const result = await sut.validate(data);

    expect(result.isRight()).toBe(true);
    expect(result.valueR.body).toMatchObject(data.body);
  });

  test('Should return correct error if body does not match necessary fields', async () => {
    const { sut } = makeSut();
    const data = {
      body: {
        description: 'any_description',
      },
    };

    const body = await sut.validate(data);

    expect(body.isLeft()).toBe(true);
    expect(body.valueL).toBeInstanceOf(InvalidRequestError);
  });
});
