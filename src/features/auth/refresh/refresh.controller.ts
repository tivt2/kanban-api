import { Request, Response } from 'express';
import { RefreshRequest } from './refresh.request';
import { RefreshService } from './refresh.service';

export class RefreshController {
  constructor(
    private refreshRequest: RefreshRequest,
    private refreshService: RefreshService,
  ) {}

  async control(req: Request, res: Response) {
    const refresh_token = await this.refreshRequest.validate(req);

    if (refresh_token.isLeft()) {
      res.status(403);
      res.json({ message: refresh_token.valueL.message });
      return;
    }

    const refreshed_tokens = await this.refreshService.refresh(
      refresh_token.valueR,
    );
    if (refreshed_tokens.isLeft()) {
      res.status(403);
      res.json({ message: refreshed_tokens.valueL.message });
      return;
    }

    const { new_access_token, new_refresh_token } = refreshed_tokens.valueR;
    res.status(200);
    res.cookie('refresh_token', new_refresh_token, { httpOnly: true });
    res.json({ access_token: new_access_token });
  }
}
