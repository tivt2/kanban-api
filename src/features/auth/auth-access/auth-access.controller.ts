import { NextFunction, Request, Response } from 'express';
import { AuthAccessRequest } from './auth-access.request';
import { AuthAccessService } from './auth-access.service';

export class AuthAccessController {
  constructor(
    private accessRequest: AuthAccessRequest,
    private accessService: AuthAccessService,
  ) {}

  async control(req: Request, res: Response, next: NextFunction) {
    const access_token = await this.accessRequest.validate(req);

    if (access_token.isLeft()) {
      res.status(401);
      res.json({ message: access_token.valueL.message });
      return;
    }

    const user_id = await this.accessService.authorize(access_token.valueR);
    if (user_id.isLeft()) {
      res.status(401);
      res.json({ message: user_id.valueL.message });
      return;
    }

    req.body.user_id = user_id.valueR;
    next();
  }
}
