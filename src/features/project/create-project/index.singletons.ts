import { get_project_repository } from '../../../data/repositories/index.singletons';
import { CreateProjectController } from './create-project.controller';
import { CreateProjectRequest } from './create-project.request';
import { CreateProjectService } from './create-project.service';

const get_create_project_request = (function initializer() {
  let create_project_request: CreateProjectRequest | undefined;
  return function () {
    if (!create_project_request) {
      create_project_request = new CreateProjectRequest();

      return create_project_request;
    }

    return create_project_request;
  };
})();

const get_create_project_service = (function initializer() {
  let create_project_service: CreateProjectService | undefined;
  return function () {
    if (!create_project_service) {
      create_project_service = new CreateProjectService(
        get_project_repository(),
      );

      return create_project_service;
    }

    return create_project_service;
  };
})();

export const get_create_project_controller = (function initializer() {
  let create_project_controller: CreateProjectController | undefined;
  return function () {
    if (!create_project_controller) {
      create_project_controller = new CreateProjectController(
        get_create_project_request(),
        get_create_project_service(),
      );

      return create_project_controller;
    }

    return create_project_controller;
  };
})();
