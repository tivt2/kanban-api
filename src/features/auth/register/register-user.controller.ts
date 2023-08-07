import { Request, Response } from 'express';
import { RegisterUserRequest } from './register-user.request';
import { RegisterUserService } from './register-user.service';

export class RegisterUserController {
  constructor(
    private register_request: RegisterUserRequest,
    private register_service: RegisterUserService,
  ) {}

  async control(req: Request, res: Response) {
    const body = await this.register_request.validate(req);
    if (body.isLeft()) {
      res.status(401);
      res.json({ message: body.valueL.message });
      return;
    }

    const { email, password } = body.valueR;
    const user = await this.register_service.register(email, password);

    if (user.isLeft()) {
      res.status(401);
      res.json({ message: user.valueL.message });
      return;
    }

    res.status(200);
    res.json({ message: `Welcome ${user.valueR.email}` });
    return;
  }
}
