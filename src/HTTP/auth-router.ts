import { Request, Response, Router } from 'express';
import { get_register_user_controller } from '../features/auth/register/index.singletons';
import { get_login_user_controller } from '../features/auth/login/index.singletons';
import { get_refresh_controller } from '../features/auth/refresh/index.singletons';

export const auth_router = Router();

auth_router.get('/', async (req, res) => {
  res.json({ message: 'Hi from auth' });
});

auth_router.post('/register', async (req, res) => {
  await get_register_user_controller().control(req, res);
});

auth_router.post('/login', async (req, res) => {
  await get_login_user_controller().control(req, res);
});

auth_router.post('/logout');

auth_router.post('/refresh', async (req, res) => {
  await get_refresh_controller().control(req, res);
});

auth_router.use((error: Error, req: Request, res: Response) => {
  res.json({ message: error.message });
});
