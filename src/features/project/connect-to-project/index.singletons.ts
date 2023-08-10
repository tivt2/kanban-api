import { get_project_repository } from '../../../data/repositories/index.singletons';
import { get_pub_sub_project_service } from '../../shared/pub-sub-project/index.singletons';
import { ConnectProjectController } from './connect-project.controller';
import { ConnectProjectRequest } from './connect-project.request';
import { ConnectProjectService } from './connect-project.service';

const get_connect_project_request = (function initializer() {
  let connect_project_request: ConnectProjectRequest | undefined;
  return function () {
    if (!connect_project_request) {
      connect_project_request = new ConnectProjectRequest();

      return connect_project_request;
    }

    return connect_project_request;
  };
})();

const get_connect_project_service = (function initializer() {
  let connect_project_service: ConnectProjectService | undefined;
  return function () {
    if (!connect_project_service) {
      connect_project_service = new ConnectProjectService(
        get_project_repository(),
      );

      return connect_project_service;
    }

    return connect_project_service;
  };
})();

export const get_connect_project_controller = (function initializer() {
  let connect_project_controller: ConnectProjectController | undefined;
  return function () {
    if (!connect_project_controller) {
      connect_project_controller = new ConnectProjectController(
        get_connect_project_request(),
        get_connect_project_service(),
        get_pub_sub_project_service(),
      );

      return connect_project_controller;
    }

    return connect_project_controller;
  };
})();
