import { Request, Response } from 'express';
import { DeleteTaskRequest } from './delete-task.request';
import { DeleteTaskService } from './delete-task.service';
import { PubSubProjectService } from '../../shared/pub-sub-project/pub-sub-project.service';

export class DeleteTaskController {
  constructor(
    private delete_task_request: DeleteTaskRequest,
    private delete_task_service: DeleteTaskService,
    private pub_sub_project_service: PubSubProjectService,
  ) {}

  async control(req: Request, res: Response) {
    const result = await this.delete_task_request.validate(req);

    if (result.isLeft()) {
      res.status(401);
      res.json({ message: result.valueL.message });
      return;
    }

    const {
      params: { project_id, task_id },
      body: { user_id },
    } = result.valueR;
    const task = await this.delete_task_service.delete_task(
      project_id,
      user_id,
      task_id,
    );

    if (task.isLeft()) {
      res.status(401);
      res.json({ message: task.valueL.message });
      return;
    }

    this.pub_sub_project_service.publish(project_id, {
      type: 'DELETE',
      change: task.valueR.id,
    });
    res.status(200);
    res.json({ task: task.valueR });
  }
}
