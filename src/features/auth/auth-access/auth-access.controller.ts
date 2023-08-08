import { NextFunction, Request, Response } from 'express';
import { AuthAccessRequest } from './auth-access.request';
import { AuthAccessService } from './auth-access.service';

export class AuthAccessController {
  constructor(
    private accessRequest: AuthAccessRequest,
    private accessService: AuthAccessService,
  ) {}

  async control(req: Request, res: Response, next: NextFunction) {
    const result = await this.accessRequest.validate(req);

    if (result.isLeft()) {
      res.status(401);
      res.json({ message: result.valueL.message });
      return;
    }
    const {
      headers: { authorization },
    } = result.valueR;
    const user_id = await this.accessService.authorize(authorization);

    if (user_id.isLeft()) {
      res.status(401);
      res.json({ message: user_id.valueL.message });
      return;
    }

    req.body.user_id = user_id.valueR;
    next();
  }
}
