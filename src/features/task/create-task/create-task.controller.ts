import { Request, Response } from 'express';
import { CreateTaskRequest } from './create-task.request';
import { CreateTaskService } from './create-task.service';
import { PubSubProjectService } from '../../shared/pub-sub-project/pub-sub-project.service';
import { ProjectChangeModel } from '../../../models/project-change.model';

export class CreateTaskController {
  constructor(
    private create_task_request: CreateTaskRequest,
    private create_task_service: CreateTaskService,
    private pub_sub_project_service: PubSubProjectService,
  ) {}

  async control(req: Request, res: Response) {
    const result = await this.create_task_request.validate(req);
    if (result.isLeft()) {
      res.status(401);
      res.json({ message: result.valueL.message });
      return;
    }

    const {
      params: { project_id },
      body: { user_id, title, content, status },
    } = result.valueR;
    const task = await this.create_task_service.create_task(
      project_id,
      user_id,
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
      type: 'CREATE',
      change: task.valueR,
    });
    res.status(200);
    res.json({ task: task.valueR });
  }
}
