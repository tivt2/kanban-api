import { Request, Response } from 'express';
import { JoinProjectRequest } from './join-project.request';
import { JoinProjectService } from './join-project.service';

export class JoinProjectController {
  constructor(
    private join_project_request: JoinProjectRequest,
    private join_project_service: JoinProjectService,
  ) {}

  async control(req: Request, res: Response) {
    const result = await this.join_project_request.validate(req);

    if (result.isLeft()) {
      res.status(403);
      res.json({ message: result.valueL.message });
      return;
    }

    const {
      params: { project_id },
      body: { user_id },
    } = result.valueR;
    const project = await this.join_project_service.join_project(
      project_id,
      user_id,
    );

    if (project.isLeft()) {
      res.status(401);
      res.json({ message: project.valueL.message });
      return;
    }

    res.status(200);
    res.json({ project });
  }
}
