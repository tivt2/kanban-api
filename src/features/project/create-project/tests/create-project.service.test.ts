import { ProjectRepositorySpy } from '../../../../data/repositories/project/project.repository.spy';
import { UserModel } from '../../../../models/user.model';
import { CreateProjectServiceError } from '../../errors/create-project.service.error';
import { CreateProjectService } from '../create-project.service';

function makeSut() {
  const project_repository = new ProjectRepositorySpy();
  const sut = new CreateProjectService(project_repository);
  return {
    sut,
    project_repository,
  };
}

describe('CreateProjectService', () => {
  test('Should throw correct error if helpers throw', async () => {
    const { sut, project_repository } = makeSut();
    const data = {
      title: 'any_title',
      description: 'any_description',
    };

    project_repository.should_throw = true;
    await expect(
      async () => await sut.create_project(data.title, data.description),
    ).rejects.toThrow(CreateProjectServiceError);
  });

  test('Should correctly pass arguments to helpers', async () => {
    const { sut } = makeSut();
    const data = {
      user_id: 'valid_id',
      title: 'any_title',
      description: 'any_description',
    };

    const new_project = await sut.create_project(
      data.user_id,
      data.title,
      data.description,
    );

    expect(new_project).toMatchObject({
      id: expect.any(String),
      title: data.title,
      description: data.description,
      created_by: data.user_id,
      participants: expect.any(Array<UserModel>),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
