import { get_task_repository } from '../../../data/repositories/index.singletons';
import { GetTasksController } from './get-tasks.controller';
import { GetTasksRequest } from './get-tasks.request';
import { GetTasksService } from './get-tasks.service';

const get_get_tasks_request = (function initializer() {
  let get_tasks_request: GetTasksRequest | undefined;
  return function () {
    if (!get_tasks_request) {
      get_tasks_request = new GetTasksRequest();

      return get_tasks_request;
    }

    return get_tasks_request;
  };
})();

const get_edit_task_service = (function initializer() {
  let get_tasks_service: GetTasksService | undefined;
  return function () {
    if (!get_tasks_service) {
      get_tasks_service = new GetTasksService(get_task_repository());

      return get_tasks_service;
    }

    return get_tasks_service;
  };
})();

export const get_get_tasks_controller = (function initializer() {
  let get_tasks_controller: GetTasksController | undefined;
  return function () {
    if (!get_tasks_controller) {
      get_tasks_controller = new GetTasksController(
        get_get_tasks_request(),
        get_edit_task_service(),
      );

      return get_tasks_controller;
    }

    return get_tasks_controller;
  };
})();
