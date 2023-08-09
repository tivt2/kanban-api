import { Request, Response, Router } from 'express';
import { get_get_tasks_controller } from '../features/task/get-tasks/index.singletons';

export const user_router = Router();

user_router.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello from user' });
});

user_router.get('/tasks', async (req, res) => {
  await get_get_tasks_controller().control(req, res);
});

user_router.use((error: Error, req: Request, res: Response) => {
  res.status(500);
  res.json({ message: error.message });
});
