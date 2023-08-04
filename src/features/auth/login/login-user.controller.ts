import { Request, Response } from 'express';
import { LoginUserRequest } from './login-user.request';
import { LoginUserService } from './login-user.service';

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
    const token = await this.loginService.login(email, password);
    if (token.isLeft()) {
      res.status(401);
      res.json({ message: body.valueL.message });
      return;
    }

    res.status(200);
    res.json({ token });
  }
}
