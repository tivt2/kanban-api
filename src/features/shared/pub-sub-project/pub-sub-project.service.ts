import { ProjectChangeModel } from '../../../models/project-change.model';

type PubSubEntry = [string, (project_change: ProjectChangeModel) => void];

export class PubSubProjectService {
  private projects = new Map<string, PubSubEntry[]>();

  async subscribe(
    project_id: string,
    user_id: string,
    callback: (project_change: ProjectChangeModel) => void,
  ) {
    const curr_subscribers = this.projects.get(project_id);

    if (!curr_subscribers) {
      this.projects.set(project_id, [[user_id, callback]]);
      return;
    }

    curr_subscribers.push([user_id, callback]);
  }

  async publish(project_id: string, project_change: ProjectChangeModel) {
    const subscribers = this.projects.get(project_id);

    if (!subscribers) {
      throw new Error('Errow while publishing');
    }

    subscribers.forEach(([_user_id, callback]) => callback(project_change));
  }

  async unsubscribe(project_id: string, user_id: string) {
    const subscribers = this.projects.get(project_id);
    if (!subscribers) {
      throw new Error('Error while unsubscribing');
    }

    if (subscribers.length === 1) {
      this.projects.delete(project_id);
      return;
    }

    const new_subscribers = subscribers.filter(
      ([sub_user_id, _sub_callback]) => sub_user_id !== user_id,
    );
    this.projects.set(project_id, new_subscribers);
  }
}
