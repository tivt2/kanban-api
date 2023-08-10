import { get_task_repository } from '../../../data/repositories/index.singletons';
import { get_pub_sub_project_service } from '../../shared/pub-sub-project/index.singletons';
import { CreateTaskController } from './create-task.controller';
import { CreateTaskRequest } from './create-task.request';
import { CreateTaskService } from './create-task.service';

const get_create_task_request = (function initializer() {
  let create_task_request: CreateTaskRequest | undefined;
  return function () {
    if (!create_task_request) {
      create_task_request = new CreateTaskRequest();

      return create_task_request;
    }

    return create_task_request;
  };
})();

const get_create_task_service = (function initializer() {
  let create_task_service: CreateTaskService | undefined;
  return function () {
    if (!create_task_service) {
      create_task_service = new CreateTaskService(get_task_repository());

      return create_task_service;
    }

    return create_task_service;
  };
})();

export const get_create_task_controller = (function initializer() {
  let create_task_controller: CreateTaskController | undefined;
  return function () {
    if (!create_task_controller) {
      create_task_controller = new CreateTaskController(
        get_create_task_request(),
        get_create_task_service(),
        get_pub_sub_project_service(),
      );

      return create_task_controller;
    }

    return create_task_controller;
  };
})();
