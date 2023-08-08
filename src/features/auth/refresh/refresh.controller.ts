import { Request, Response } from 'express';
import { RefreshRequest } from './refresh.request';
import { RefreshService } from './refresh.service';
import { REFRESH_EXPIRES_IN_MS } from '../../../config/CONSTANTS';

export class RefreshController {
  constructor(
    private refreshRequest: RefreshRequest,
    private refreshService: RefreshService,
  ) {}

  async control(req: Request, res: Response) {
    const result = await this.refreshRequest.validate(req);

    if (result.isLeft()) {
      res.status(403);
      res.json({ message: result.valueL.message });
      return;
    }

    const {
      cookies: { refresh_token },
    } = result.valueR;
    const refreshed_tokens = await this.refreshService.refresh(refresh_token);

    if (refreshed_tokens.isLeft()) {
      res.status(403);
      res.json({ message: refreshed_tokens.valueL.message });
      return;
    }

    const { new_access_token, new_refresh_token } = refreshed_tokens.valueR;

    res.status(200);
    res.cookie('refresh_token', new_refresh_token, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + REFRESH_EXPIRES_IN_MS),
    });
    res.json({ access_token: new_access_token });
  }
}
