import { get_project_repository } from '../../../data/repositories/index.singletons';
import { LeaveProjectController } from './leave-project.controller';
import { LeaveProjectRequest } from './leave-project.request';
import { LeaveProjectService } from './leave-project.service';

const get_leave_project_request = (function initializer() {
  let leave_project_request: LeaveProjectRequest | undefined;
  return function () {
    if (!leave_project_request) {
      leave_project_request = new LeaveProjectRequest();

      return leave_project_request;
    }

    return leave_project_request;
  };
})();

const get_leave_project_service = (function initializer() {
  let leave_project_service: LeaveProjectService | undefined;
  return function () {
    if (!leave_project_service) {
      leave_project_service = new LeaveProjectService(get_project_repository());

      return leave_project_service;
    }

    return leave_project_service;
  };
})();

export const get_leave_project_controller = (function initializer() {
  let leave_project_controller: LeaveProjectController | undefined;
  return function () {
    if (!leave_project_controller) {
      leave_project_controller = new LeaveProjectController(
        get_leave_project_request(),
        get_leave_project_service(),
      );

      return leave_project_controller;
    }

    return leave_project_controller;
  };
})();
