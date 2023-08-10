import { Request, Response } from 'express';
import { EditTaskRequest } from './edit-task.request';
import { EditTaskService } from './edit-task.service';
import { PubSubProjectService } from '../../shared/pub-sub-project/pub-sub-project.service';

export class EditTaskController {
  constructor(
    private edit_task_request: EditTaskRequest,
    private edit_task_service: EditTaskService,
    private pub_sub_project_service: PubSubProjectService,
  ) {}

  async control(req: Request, res: Response) {
    const result = await this.edit_task_request.validate(req);

    if (result.isLeft()) {
      res.status(401);
      res.json({ message: result.valueL.message });
      return;
    }

    const {
      params: { project_id, task_id },
      body: { user_id, title, content, status },
    } = result.valueR;
    const task = await this.edit_task_service.edit_task(
      project_id,
      user_id,
      task_id,
      title,
      content,
      status,
    );

    if (task.isLeft()) {
      res.status(401);
      res.json({ message: task.valueL.message });
      return;
    }

    this.pub_sub_project_service.publish(project_id, {
      type: 'UPDATE',
      change: task.valueR,
    });
    res.status(200);
    res.json({ task: task.valueR });
  }
}
