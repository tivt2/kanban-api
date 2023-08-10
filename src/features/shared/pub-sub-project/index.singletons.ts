import { PubSubProjectService } from './pub-sub-project.service';

export const get_pub_sub_project_service = (function initializer() {
  let pub_sub_project_service: PubSubProjectService | undefined;
  return function () {
    if (!pub_sub_project_service) {
      pub_sub_project_service = new PubSubProjectService();

      return pub_sub_project_service;
    }

    return pub_sub_project_service;
  };
})();
