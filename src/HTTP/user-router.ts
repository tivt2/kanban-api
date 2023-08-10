import { NextFunction, Request, Response, Router } from 'express';
import { get_get_tasks_controller } from '../features/task/get-tasks/index.singletons';
import { server_error_catcher_middleware } from './middleware/server-error-catcher';

export const user_router = Router();

user_router.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello from user' });
});

user_router.get('/tasks', async (req, res) => {
  await get_get_tasks_controller().control(req, res);
});

user_router.use(server_error_catcher_middleware('user_router'));
