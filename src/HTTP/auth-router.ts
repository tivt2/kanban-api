import { NextFunction, Request, Response, Router } from 'express';
import { get_register_user_controller } from '../features/auth/register/index.singletons';
import { get_login_user_controller } from '../features/auth/login/index.singletons';
import { get_refresh_controller } from '../features/auth/refresh/index.singletons';
import { get_logout_user_controller } from '../features/auth/logout/index.singletons';
import { server_error_catcher_middleware } from './middleware/server-error-catcher';

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

auth_router.post('/refresh', async (req, res) => {
  await get_refresh_controller().control(req, res);
});

auth_router.post('/logout', async (req, res) => {
  await get_logout_user_controller().control(req, res);
});

auth_router.use(server_error_catcher_middleware('auth_router'));
