import { NextFunction, Request, Response, Router } from 'express';
import { get_auth_access_controller } from '../features/auth/auth-access/index.singletons';
import { project_router } from './project-router';
import { user_router } from './user-router';
import { server_error_catcher_middleware } from './middleware/server-error-catcher';

export const api_router = Router();

api_router.use(async (req, res, next) => {
  await get_auth_access_controller().control(req, res, next);
});

api_router.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello from api' });
});

api_router.use('/project', project_router);

api_router.use('/user', user_router);

api_router.use(server_error_catcher_middleware('api_router'));
