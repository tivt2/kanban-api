import { get_project_repository } from '../../../data/repositories/index.singletons';
import { EditProjectController } from './edit-project.controller';
import { EditProjectRequest } from './edit-project.request';
import { EditProjectService } from './edit-project.service';

const get_edit_project_request = (function initializer() {
  let edit_project_request: EditProjectRequest | undefined;
  return function () {
    if (!edit_project_request) {
      edit_project_request = new EditProjectRequest();

      return edit_project_request;
    }

    return edit_project_request;
  };
})();

const get_edit_project_service = (function initializer() {
  let edit_project_service: EditProjectService | undefined;
  return function () {
    if (!edit_project_service) {
      edit_project_service = new EditProjectService(get_project_repository());

      return edit_project_service;
    }

    return edit_project_service;
  };
})();

export const get_edit_project_controller = (function initializer() {
  let edit_project_controller: EditProjectController | undefined;
  return function () {
    if (!edit_project_controller) {
      edit_project_controller = new EditProjectController(
        get_edit_project_request(),
        get_edit_project_service(),
      );

      return edit_project_controller;
    }

    return edit_project_controller;
  };
})();
