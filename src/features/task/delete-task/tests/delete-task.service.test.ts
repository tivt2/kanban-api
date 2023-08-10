import { TaskRepositorySpy } from '../../../../data/repositories/task/task.repository.spy';
import { TaskUpdateModel } from '../../../../models/task.model';
import { DeleteTaskServiceError } from '../../errors/delete-task.service.error';
import { DeleteTaskService } from '../delete-task.service';

function makeSut() {
  const task_repository = new TaskRepositorySpy();
  const sut = new DeleteTaskService(task_repository);
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
      task_id: 'valid_id',
    };

    task_repository.should_throw = true;
    await expect(
      async () =>
        await sut.delete_task(data.project_id, data.user_id, data.task_id),
    ).rejects.toThrow(DeleteTaskServiceError);
  });

  test('Should correctly pass arguments to helpers', async () => {
    const { sut } = makeSut();
    const data = {
      project_id: 'any_id',
      user_id: 'valid_id',
      task_id: 'valid_id',
    };

    const new_task = await sut.delete_task(
      data.project_id,
      data.user_id,
      data.task_id,
    );

    expect(new_task.isRight()).toBe(true);
    expect(new_task.valueR).toMatchObject({
      id: data.task_id,
      title: expect.any(String),
      content: expect.any(String),
      status: expect.any(String),
      created_by: data.user_id,
      created_at: expect.any(Date),
      updates: expect.any(Array<TaskUpdateModel>),
    });
  });
});
