import { Request, Response } from 'express';
import { RegisterUserRequest } from './register-user.request';
import { RegisterUserService } from './register-user.service';

export class RegisterUserController {
  constructor(
    private registerRequest: RegisterUserRequest,
    private registerService: RegisterUserService,
  ) {}

  async control(req: Request, res: Response) {
    const { email, password } = await this.registerRequest.validate(req);
    const user = await this.registerService.register(email, password);

    res.status(200);
    res.json({ message: `Welcome ${user.email}` });
  }
}
