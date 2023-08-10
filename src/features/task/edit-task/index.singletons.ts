import { get_task_repository } from '../../../data/repositories/index.singletons';
import { get_pub_sub_project_service } from '../../shared/pub-sub-project/index.singletons';
import { EditTaskController } from './edit-task.controller';
import { EditTaskRequest } from './edit-task.request';
import { EditTaskService } from './edit-task.service';

const get_edit_task_request = (function initializer() {
  let edit_task_request: EditTaskRequest | undefined;
  return function () {
    if (!edit_task_request) {
      edit_task_request = new EditTaskRequest();

      return edit_task_request;
    }

    return edit_task_request;
  };
})();

const get_edit_task_service = (function initializer() {
  let edit_task_service: EditTaskService | undefined;
  return function () {
    if (!edit_task_service) {
      edit_task_service = new EditTaskService(get_task_repository());

      return edit_task_service;
    }

    return edit_task_service;
  };
})();

export const get_edit_task_controller = (function initializer() {
  let edit_task_controller: EditTaskController | undefined;
  return function () {
    if (!edit_task_controller) {
      edit_task_controller = new EditTaskController(
        get_edit_task_request(),
        get_edit_task_service(),
        get_pub_sub_project_service(),
      );

      return edit_task_controller;
    }

    return edit_task_controller;
  };
})();
