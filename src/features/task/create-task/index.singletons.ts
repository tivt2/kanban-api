import { CreateTaskRequest } from './create-task.request';

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
