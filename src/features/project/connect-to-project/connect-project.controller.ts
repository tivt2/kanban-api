import { Request, Response } from 'express';
import { ConnectProjectRequest } from './connect-project.request';
import { ConnectProjectService } from './connect-project.service';
import { PubSubProjectService } from '../../shared/pub-sub-project/pub-sub-project.service';

export class ConnectProjectController {
  constructor(
    private connect_project_request: ConnectProjectRequest,
    private connect_project_service: ConnectProjectService,
    private pub_sub_project_service: PubSubProjectService,
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
    res.write('data: ' + JSON.stringify(project.valueR) + '\n\n');
    this.pub_sub_project_service.subscribe(
      project_id,
      user_id,
      (project_change) => {
        res.write('data: ' + JSON.stringify(project_change) + '\n\n');
      },
    );
    req.on('close', () => {
      this.pub_sub_project_service.unsubscribe(project_id, user_id);
      res.end('Disconnect');
    });
  }
}
