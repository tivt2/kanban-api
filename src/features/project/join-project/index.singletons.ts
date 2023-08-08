import { get_project_repository } from '../../../data/repositories/index.singletons';
import { JoinProjectController } from './join-project.controller';
import { JoinProjectRequest } from './join-project.request';
import { JoinProjectService } from './join-project.service';

const get_join_project_request = (function initializer() {
  let join_project_request: JoinProjectRequest | undefined;
  return function () {
    if (!join_project_request) {
      join_project_request = new JoinProjectRequest();

      return join_project_request;
    }

    return join_project_request;
  };
})();

const get_join_project_service = (function initializer() {
  let join_project_service: JoinProjectService | undefined;
  return function () {
    if (!join_project_service) {
      join_project_service = new JoinProjectService(get_project_repository());

      return join_project_service;
    }

    return join_project_service;
  };
})();

export const get_join_project_controller = (function initializer() {
  let join_project_controller: JoinProjectController | undefined;
  return function () {
    if (!join_project_controller) {
      join_project_controller = new JoinProjectController(
        get_join_project_request(),
        get_join_project_service(),
      );

      return join_project_controller;
    }

    return join_project_controller;
  };
})();
