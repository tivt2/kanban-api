import { Request, Response, Router } from 'express';
import { get_auth_access_controller } from '../features/auth/auth-access/index.singletons';
import { project_router } from './project-router';
import { task_router } from './task-router';

export const api_router = Router();

api_router.use(async (req, res, next) => {
  await get_auth_access_controller().control(req, res, next);
});

api_router.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello from api' });
});

api_router.use('/project', project_router);

api_router.use('/tasks', task_router);

api_router.use((error: Error, req: Request, res: Response) => {
  res.status(500);
  res.json({ message: error.message });
});
