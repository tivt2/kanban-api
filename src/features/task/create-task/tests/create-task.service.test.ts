import { TaskRepositorySpy } from '../../../../data/repositories/task/task.repository.spy';
import {
  TaskStatusModel,
  TaskUpdateModel,
} from '../../../../models/task.model';
import { CreateTaskServiceError } from '../../errors/create-task.service.error';
import { CreateTaskService } from '../create-task.service';

function makeSut() {
  const task_repository = new TaskRepositorySpy();
  const sut = new CreateTaskService(task_repository);
  return {
    sut,
    task_repository,
  };
}

describe('CreateTaskService', () => {
  test('Should throw correct error if helpers throw', async () => {
    const { sut, task_repository } = makeSut();
    const data = {
      project_id: 'any_id',
      user_id: 'valid_id',
      title: 'any_title',
      content: 'any_content',
      status: 'INCOMPLETE',
    };

    task_repository.should_throw = true;
    await expect(
      async () =>
        await sut.create_task(
          data.project_id,
          data.user_id,
          data.title,
          data.content,
          data.status as TaskStatusModel,
        ),
    ).rejects.toThrow(CreateTaskServiceError);
  });

  test('Should correctly pass arguments to helpers', async () => {
    const { sut } = makeSut();
    const data = {
      project_id: 'any_id',
      user_id: 'valid_id',
      title: 'any_title',
      content: 'any_content',
      status: 'INCOMPLETE',
    };

    const new_task = await sut.create_task(
      data.project_id,
      data.user_id,
      data.title,
      data.content,
      data.status as TaskStatusModel,
    );

    expect(new_task.isRight()).toBe(true);
    expect(new_task.valueR).toMatchObject({
      id: expect.any(String),
      title: data.title,
      content: data.content,
      status: data.status,
      created_by: data.user_id,
      created_at: expect.any(Date),
      updates: expect.any(Array<TaskUpdateModel>),
    });
  });
});
