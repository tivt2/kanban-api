import { get_task_repository } from '../../../data/repositories/index.singletons';
import { DeleteTaskController } from './delete-task.controller';
import { DeleteTaskRequest } from './delete-task.request';
import { DeleteTaskService } from './delete-task.service';

const get_delete_task_request = (function initializer() {
  let delete_task_request: DeleteTaskRequest | undefined;
  return function () {
    if (!delete_task_request) {
      delete_task_request = new DeleteTaskRequest();

      return delete_task_request;
    }

    return delete_task_request;
  };
})();

const get_delete_task_service = (function initializer() {
  let delete_task_service: DeleteTaskService | undefined;
  return function () {
    if (!delete_task_service) {
      delete_task_service = new DeleteTaskService(get_task_repository());

      return delete_task_service;
    }

    return delete_task_service;
  };
})();

export const get_delete_task_controller = (function initializer() {
  let delete_task_controller: DeleteTaskController | undefined;
  return function () {
    if (!delete_task_controller) {
      delete_task_controller = new DeleteTaskController(
        get_delete_task_request(),
        get_delete_task_service(),
      );

      return delete_task_controller;
    }

    return delete_task_controller;
  };
})();
