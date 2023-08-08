import { Request, Response } from 'express';
import { LogoutUserRequest } from './logout-user.request';
import { LogoutUserService } from './logout-user.service';

export class LogoutUserController {
  constructor(
    private logoutRequest: LogoutUserRequest,
    private logoutService: LogoutUserService,
  ) {}

  async control(req: Request, res: Response) {
    const result = await this.logoutRequest.validate(req);

    if (result.isLeft()) {
      res.status(401);
      res.json({ message: result.valueL.message });
      return;
    }

    const {
      cookies: { refresh_token },
    } = result.valueR;
    const user_id = await this.logoutService.logout(refresh_token);

    if (user_id.isLeft()) {
      res.status(403);
      res.json({ message: user_id.valueL.message });
      return;
    }

    res.status(200);
    res.cookie('refresh_token', '', { httpOnly: true, expires: new Date(0) });
    res.json({ message: `Login out ${user_id.valueR}` });
  }
}
