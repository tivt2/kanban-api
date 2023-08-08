import { ProjectRepositorySpy } from '../../../../data/repositories/project/project.repository.spy';
import { InvalidProjectError } from '../../errors/invalid-project-error';
import { JoinProjectServiceError } from '../../errors/join-project-service.error';
import { JoinProjectService } from '../join-project.service';

function makeSut() {
  const project_repository_spy = new ProjectRepositorySpy();
  const sut = new JoinProjectService(project_repository_spy);
  return {
    sut,
    project_repository_spy,
  };
}

describe('JoinProjectService', () => {
  test('Should call helpers with correct arguments', async () => {
    const { sut } = makeSut();
    const data = {
      project_id: 'valid_project_id',
      user_id: 'valid_user_id',
    };

    const project = await sut.join_project(data.project_id, data.user_id);

    expect(project.isRight()).toBe(true);
    expect(
      project.valueR.participants.find((el) => el.id === data.user_id)?.id,
    ).toBe(data.user_id);
  });

  test('Should throw correct error if helpers throw', async () => {
    const { sut, project_repository_spy } = makeSut();
    const data = {
      project_id: 'valid_project_id',
      user_id: 'valid_user_id',
    };

    project_repository_spy.should_throw = true;
    await expect(
      async () => await sut.join_project(data.project_id, data.user_id),
    ).rejects.toThrow(JoinProjectServiceError);
  });

  test('Should return correct error if invalid project or user', async () => {
    const { sut, project_repository_spy } = makeSut();
    const data = {
      project_id: 'invalid_project_id',
      user_id: 'invalid_user_id',
    };

    project_repository_spy.invalid_project = true;
    const project = await sut.join_project(data.project_id, data.user_id);

    expect(project.isLeft()).toBe(true);
    expect(project.valueL).toBeInstanceOf(InvalidProjectError);
  });
});
