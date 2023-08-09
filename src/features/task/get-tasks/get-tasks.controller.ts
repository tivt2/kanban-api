import { Request, Response } from 'express';
import { GetTasksRequest } from './get-tasks.request';
import { GetTasksService } from './get-tasks.service';

export class GetTasksController {
  constructor(
    private get_tasks_request: GetTasksRequest,
    private get_tasks_service: GetTasksService,
  ) {}

  async control(req: Request, res: Response) {
    const result = await this.get_tasks_request.validate(req);

    if (result.isLeft()) {
      res.status(401);
      res.json({ message: result.valueL.message });
      return;
    }

    const {
      params: { project_id },
      body: { user_id },
    } = result.valueR;
    const task = await this.get_tasks_service.get_tasks(project_id, user_id);

    if (task.isLeft()) {
      res.status(401);
      res.json({ message: task.valueL.message });
      return;
    }

    res.status(200);
    res.json({ task: task.valueR });
  }
}
