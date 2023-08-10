import { TaskRepositorySpy } from '../../../../data/repositories/task/task.repository.spy';
import { TaskUpdateModel } from '../../../../models/task.model';
import { GetTasksServiceError } from '../../errors/get-tasks.service.error';
import { GetTasksService } from '../get-tasks.service';

function makeSut() {
  const task_repository = new TaskRepositorySpy();
  const sut = new GetTasksService(task_repository);
  return {
    sut,
    task_repository,
  };
}

describe('GetTasksService', () => {
  test('Should throw correct error if helpers throw', async () => {
    const { sut, task_repository } = makeSut();
    const data = {
      user_id: 'valid_id',
    };

    task_repository.should_throw = true;
    await expect(async () => await sut.get_tasks(data.user_id)).rejects.toThrow(
      GetTasksServiceError,
    );
  });

  test('Should correctly pass arguments to helpers', async () => {
    const { sut } = makeSut();
    const data = {
      user_id: 'valid_id',
    };

    const new_task = await sut.get_tasks(data.user_id);

    expect(new_task.isRight()).toBe(true);
    expect(new_task.valueR).toMatchObject(expect.any(Array<TaskUpdateModel>));
  });
});
