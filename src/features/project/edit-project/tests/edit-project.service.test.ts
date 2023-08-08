import { ProjectRepositorySpy } from '../../../../data/repositories/project/project.repository.spy';
import { EditProjectServiceError } from '../../errors/edit-project.service.error';
import { InvalidProjectError } from '../../errors/invalid-project-error';
import { EditProjectService } from '../edit-project.service';

function makeSut() {
  const project_repository_spy = new ProjectRepositorySpy();
  const sut = new EditProjectService(project_repository_spy);
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
      title: 'valid_new_title',
      description: 'valid_new_description',
    };

    const project = await sut.edit_project(
      data.project_id,
      data.user_id,
      data.title,
      data.description,
    );

    expect(project.isRight()).toBe(true);
  });

  test('Should throw correct error if helpers throw', async () => {
    const { sut, project_repository_spy } = makeSut();
    const data = {
      project_id: 'valid_project_id',
      user_id: 'valid_user_id',
      title: 'valid_new_title',
      description: 'valid_new_description',
    };

    project_repository_spy.should_throw = true;
    await expect(
      async () =>
        await sut.edit_project(
          data.project_id,
          data.user_id,
          data.title,
          data.description,
        ),
    ).rejects.toThrow(EditProjectServiceError);
  });

  test('Should return correct error if invalid project or user', async () => {
    const { sut, project_repository_spy } = makeSut();
    const data = {
      project_id: 'invalid_project_id',
      user_id: 'invalid_user_id',
      title: 'valid_new_title',
      description: 'valid_new_description',
    };

    project_repository_spy.invalid_project = true;
    const project = await sut.edit_project(
      data.project_id,
      data.user_id,
      data.title,
      data.description,
    );

    expect(project.isLeft()).toBe(true);
    expect(project.valueL).toBeInstanceOf(InvalidProjectError);
  });
});
