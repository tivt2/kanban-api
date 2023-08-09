import { Request, Response } from 'express';
import { ConnectProjectRequest } from './connect-project.request';
import { ConnectProjectService } from './connect-project.service';

export class ConnectProjectController {
  constructor(
    private connect_project_request: ConnectProjectRequest,
    private connect_project_service: ConnectProjectService,
  ) {}

  async control(req: Request, res: Response) {
    const result = await this.connect_project_request.validate(req);

    if (result.isLeft()) {
      res.status(401);
      res.json({ message: result.valueL.message });
      return;
    }

    const {
      params: { project_id },
      body: { user_id },
    } = result.valueR;
    const project = await this.connect_project_service.connect_project(
      project_id,
      user_id,
    );

    if (project.isLeft()) {
      res.status(401);
      res.json({ message: project.valueL.message });
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    res.write(JSON.stringify(project.valueR));
    req.on('close', () => res.end('Disconnect'));
  }
}
