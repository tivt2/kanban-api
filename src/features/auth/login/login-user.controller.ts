import { Request, Response } from 'express';
import { LoginUserRequest } from './login-user.request';
import { LoginUserService } from './login-user.service';
import { REFRESH_EXPIRES_IN_MS } from '../../../config/CONSTANTS';

export class LoginUserController {
  constructor(
    private loginRequest: LoginUserRequest,
    private loginService: LoginUserService,
  ) {}

  async control(req: Request, res: Response) {
    const body = await this.loginRequest.validate(req);
    if (body.isLeft()) {
      res.status(401);
      res.json({ message: body.valueL.message });
      return;
    }

    const { email, password } = body.valueR;
    const tokens = await this.loginService.login(email, password);
    if (tokens.isLeft()) {
      res.status(401);
      res.json({ message: tokens.valueL.message });
      return;
    }

    const { access_token, refresh_token } = tokens.valueR;

    res.status(200);
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + REFRESH_EXPIRES_IN_MS),
    });
    res.json({ access_token });
  }
}
