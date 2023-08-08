import { InvalidRequestError } from '../../../shared/errors/invalid-request-error';
import { CreateProjectRequest } from '../create-project.request';

function makeSut() {
  const sut = new CreateProjectRequest();
  return { sut };
}

describe('CreateProjectRequest', () => {
  test('Should receive in the body or request all fields necessary', async () => {
    const { sut } = makeSut();
    const data = {
      body: {
        user_id: 'valid_id',
        title: 'any_title',
        description: 'any_description',
      },
    };

    const data_without_description = {
      body: {
        user_id: 'valid_id',
        title: 'any_title',
      },
    };

    const result = await sut.validate(data);

    expect(result.isRight()).toBe(true);
    expect(result.valueR.body).toMatchObject(data.body);

    const result_without_description = await sut.validate(
      data_without_description,
    );

    expect(result_without_description.isRight()).toBe(true);
    expect(result_without_description.valueR.body).toMatchObject(
      data_without_description.body,
    );
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
