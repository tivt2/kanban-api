import { Request, Response } from 'express';
import { LeaveProjectRequest } from './leave-project.request';
import { LeaveProjectService } from './leave-project.service';

export class LeaveProjectController {
  constructor(
    private leave_project_request: LeaveProjectRequest,
    private leave_project_service: LeaveProjectService,
  ) {}

  async controle(req: Request, res: Response) {
    const leave_project_body = await this.leave_project_request.validate(req);

    if (leave_project_body.isLeft()) {
      res.status(401);
      res.json({ message: leave_project_body.valueL.message });
      return;
    }

    const { project_id, user_id } = leave_project_body.valueR;
    await this.leave_project_service.leave_project(project_id, user_id);

    res.status(200);
    res.json({ message: `Left from project ${project_id}` });
  }
}
