import { Request, Response } from 'express';
import { EditProjectRequest } from './edit-project.request';
import { EditProjectService } from './edit-project.service';

export class EditProjectController {
  constructor(
    private edit_project_request: EditProjectRequest,
    private edit_project_service: EditProjectService,
  ) {}

  async control(req: Request, res: Response) {
    const result = await this.edit_project_request.validate(req);

    if (result.isLeft()) {
      res.status(401);
      res.json({ message: result.valueL.message });
      return;
    }

    const {
      params: { project_id },
      body: { user_id, title, description },
    } = result.valueR;

    const project = await this.edit_project_service.edit_project(
      project_id,
      user_id,
      title,
      description,
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
