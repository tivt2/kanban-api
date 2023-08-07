import { Request, Response } from 'express';
import { CreateProjectRequest } from './create-project.request';
import { CreateProjectService } from './create-project.service';

export class CreateProjectController {
  constructor(
    private create_project_request: CreateProjectRequest,
    private create_project_service: CreateProjectService,
  ) {}

  async control(req: Request, res: Response) {
    const body = await this.create_project_request.validate(req);

    if (body.isLeft()) {
      res.status(400);
      res.json({ message: body.valueL.message });
      return;
    }

    const { title, description } = body.valueR;
    const created_project = await this.create_project_service.create_project(
      title,
      description,
    );

    res.status(200);
    res.json({ message: `Create project ${created_project.title}` });
  }
}
