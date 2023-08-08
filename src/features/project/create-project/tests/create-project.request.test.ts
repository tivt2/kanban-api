import { InvalidProjectRequestError } from '../../errors/invalid-project-request-error';
import { RequestValidatorSpy } from '../../utils/request-validator/request-validator.service.spy';
import { CreateProjectRequest } from '../create-project.request';

function makeSut() {
  const request_validator_spy = new RequestValidatorSpy();
  const sut = new CreateProjectRequest(request_validator_spy);
  return { sut, request_validator_spy };
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

    const body = await sut.validate(data);

    expect(body.isRight()).toBe(true);
    expect(body.valueR).toMatchObject(data.body);

    const body_without_description = await sut.validate(
      data_without_description,
    );

    expect(body_without_description.isRight()).toBe(true);
    expect(body_without_description.valueR).toMatchObject(
      data_without_description.body,
    );
  });

  test('Should return correct error if body does not match necessary fields', async () => {
    const { sut, request_validator_spy } = makeSut();
    const data = {
      body: {
        description: 'any_description',
      },
    };

    request_validator_spy.validate = false;
    const body = await sut.validate(data);

    expect(body.isLeft()).toBe(true);
    expect(body.valueL).toBeInstanceOf(InvalidProjectRequestError);
  });
});
